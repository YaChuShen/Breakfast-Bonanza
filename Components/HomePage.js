'use client';
import { Box, Center } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import { signOut, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';
import { selectCustomer } from 'store/features/customerSlice';
import { useDispatch } from 'react-redux';
import { getInitCustomersState } from 'store/features/customerSlice';
import Table from 'Components/Table';
import PlateSection from 'Components/PlateSection';
import React, { useEffect } from 'react';
import Media from 'Components/Media';
import Grass1 from 'Components/Grass1';
import GameStageBoard from 'Components/GameStageBoard';
import Navbar from 'Components/Navbar';
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

  useEffect(() => {
    if (session) {
      const tokenExpiry = session.expjwt * 1000;
      const currentTime = Date.now();

      if (tokenExpiry <= currentTime) {
        console.log('過期了拉');
        signOut();
      } else {
        //確保在 token 還未過期的情況下，讓 setTimeout 延遲登出，直到 token 到期為止。
        const timeUntilExpiry = tokenExpiry - currentTime;
        setTimeout(() => {
          console.log('過期了拉');
        }, timeUntilExpiry);
      }
    }
  }, [session]);

  return (
    <Media greaterThanOrEqual="md">
      <FormProvider {...methods}>
        <Tour profileId={profileId}>
          <Box as="form">
            {session && <Navbar profileId={profileId} />}
            <GameStageBoard
              session={session}
              isTour={dbData.isTour}
              score={currentData.score}
              isLevel2={isLevel2}
            />
            <Customers currentData={currentData} />
            <Box pos="relative" userSelect="none">
              <Grass1 />
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
