'use client';
import { Box, Center } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectCustomer } from 'store/features/customerSlice';
import { useDispatch } from 'react-redux';
import { getInitCustomersState } from 'store/features/customerSlice';
import Table from 'Components/Table';
import PlateSection from 'Components/PlateSection';
import React, { useEffect, useState } from 'react';
import Media from 'Components/Media';
import Gress1 from 'Components/Gress1';
import TimerBoard from 'Components/TimerBoard';
import Tour from 'Components/Tour';
import Customers from './Customers';
import Kitchen from './Kitchen';

function HomePage({ dbData, profileId }) {
  const methods = useForm();
  const { data: session } = useSession();
  const currentData = useSelector(selectCustomer);
  const isLevel2 = dbData.isLevel2;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInitCustomersState({ isLevel2 }));
  }, []);

  return (
    <Media greaterThanOrEqual="md">
      <FormProvider {...methods}>
        <Tour profileId={profileId}>
          <Box as="form">
            <TimerBoard
              session={session}
              isTour={dbData.isTour}
              score={currentData.score}
              isLevel2={isLevel2}
            />
            <Customers currentData={currentData} />
            <Box pos="relative" userSelect="none">
              <Gress1 />
              <Table />
              <Center>
                <PlateSection />
                <Kitchen isLevel2={isLevel2} />
              </Center>
            </Box>
          </Box>
        </Tour>
      </FormProvider>
    </Media>
  );
}

export default HomePage;
