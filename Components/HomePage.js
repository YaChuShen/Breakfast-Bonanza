'use client';
import { Box, Center } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectCustomer } from 'store/features/customerSlice';
import { useDispatch } from 'react-redux';
import { getInitCustonersState } from 'store/features/customerSlice';
import Table from 'Components/Table';
import PlateSection from 'Components/PlateSection';
import React, { useEffect, useState } from 'react';
import Media from 'Components/Media';
import Gress1 from 'Components/Gress1';
import TimerBoard from 'Components/TimerBoard';
import Navbar from 'Components/Navbar';
import Tour from 'Components/Tour';
import Customers from './Customers';
import Kitchen from './Kitchen';

function HomePage({ dbData, profileId }) {
  const methods = useForm();
  const { data: session } = useSession();
  const [start, setStart] = useState(false);
  const currentData = useSelector(selectCustomer);
  const level2 = dbData.isLevel2;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitCustonersState({ level2 }));
  }, []);

  return (
    <Media greaterThanOrEqual="md">
      <FormProvider {...methods}>
        <Tour profileId={profileId}>
          <Box as="form">
            {session && <Navbar profileId={profileId} />}
            <TimerBoard
              setStart={setStart}
              start={start}
              session={session}
              isTour={dbData.isTour}
              score={currentData.score}
            />
            <Customers currentData={currentData} start={start} />
            <Box pos="relative" userSelect="none">
              <Gress1 />
              <Table />
              <Center>
                <PlateSection />
                <Kitchen level2={level2} />
              </Center>
            </Box>
          </Box>
        </Tour>
      </FormProvider>
    </Media>
  );
}

export default HomePage;
