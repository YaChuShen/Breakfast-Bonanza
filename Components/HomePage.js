'use client';

import { Box, Center, HStack, Image, Stack, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import values from 'helpers/customerForm';
import FoodTemplate from 'Components/FoodTemplate';
import dynamic from 'next/dynamic';
import CookTemplate from 'Components/CookTemplate';
import Toaster from 'Components/Toaster';
import { range } from 'lodash';
import Jam from 'Components/Jam';
import TrashCan from 'Components/TrashCan';
import Table from 'Components/Table';
import FoodPlateSection from 'Components/FoodPlateSection';
import PlateSection from 'Components/PlateSection';
import { tool } from 'helpers/rwd';
import { useSession } from 'next-auth/react';
import React, { createElement, useEffect, useMemo, useState } from 'react';
import Media from 'Components/Media';
import Gress1 from 'Components/Gress1';
import TimerBoard from 'Components/TimerBoard';
import LittleTree from 'Components/LittleTree';
import { useSelector } from 'react-redux';
import { selectCustomer } from 'store/features/customerSlice';
import defaultConfig from 'contents/rootConfig';
import Navbar from 'Components/Navbar';
import Tour from 'Components/Tour';
import RosemarryBowl from 'Components/RosemarryBowl';
import smartSize from 'helpers/smartSize';

const CustomerTemplate = dynamic(() => import('Components/CustomerTemplate'), {
  ssr: false,
});

function HomePage({ dbData, profileId }) {
  const methods = useForm({ defaultValues: values });
  const data = methods.watch();
  const { data: session } = useSession();
  const [start, setStart] = useState(false);
  const currentData = useSelector(selectCustomer);
  const level2 = true;

  const toasterSection = (
    <Stack
      spacing={0}
      direction={{ base: level2 ? 'column' : 'row', lg: 'row' }}
      alignItems="center"
    >
      <HStack>
        <Toaster w={smartSize('5em', '7em', level2)} tool={undefined} />
        {level2 && (
          <Toaster w={smartSize('5em', '7em', level2)} tool={undefined} />
        )}
      </HStack>
      <Stack direction={{ base: level2 ? 'row' : 'column', lg: 'column' }}>
        <Jam />
        <FoodTemplate
          value={'toast0'}
          src={'toast0'}
          w={{ base: '4.5em', lg: '5.5em' }}
        />
      </Stack>
    </Stack>
  );

  const materialSection = (
    <HStack spacing={0} className="first-step">
      <CookTemplate
        tool={'pan'}
        w={smartSize('9em', '11em', level2)}
        zIndex={1}
        isLevel2={level2}
      />
      {level2 && (
        <CookTemplate
          tool={'pan'}
          w={smartSize('9em', '11em', level2)}
          zIndex={1}
          isLevel2={level2}
        />
      )}
      <FoodPlateSection level2={level2} />
      <Box pl="4">
        <FoodTemplate value={'coffee'} src={'coffee'} />
      </Box>
    </HStack>
  );

  return (
    <Media greaterThanOrEqual="md">
      <FormProvider {...methods}>
        <Tour profileId={profileId}>
          <Box as="form">
            {session && <Navbar profileId={profileId} />}
            {/* <TimerBoard
              setStart={setStart}
              start={start}
              session={session}
              data={data}
              isTour={dbData.isTour}
            /> */}
            {useMemo(() => {
              return (
                <>
                  <Center pt="3em" pos="relative">
                    <Image src="./window.svg" w="70em" minW="70em" alt="game" />
                    <HStack
                      pos="absolute"
                      zIndex={10}
                      spacing={20}
                      alignItems="center"
                      justifyContent="center"
                      py="20"
                    >
                      {range(defaultConfig.customers).map((e, i) => (
                        <CustomerTemplate
                          wishFood={currentData[`customer${i + 1}`].order}
                          status={currentData[`customer${i + 1}`].status}
                          overtime={currentData[`customer${i + 1}`].overtime}
                          id={`customer${i + 1}`}
                          src={`customer${i + 1}`}
                          key={e}
                          start={start}
                          className={i === 0 ? 'three-step' : ''}
                        />
                      ))}
                    </HStack>
                  </Center>
                  <Box pos="relative" userSelect="none">
                    <Gress1 />
                    <Table />
                    <Center>
                      <PlateSection data={data} />
                      <HStack pos="absolute" bottom={tool} spacing={0}>
                        <LittleTree />
                        {toasterSection}
                        {materialSection}
                        <RosemarryBowl />
                        <TrashCan />
                      </HStack>
                    </Center>
                  </Box>
                </>
              );
            }, [data])}
          </Box>
        </Tour>
      </FormProvider>
    </Media>
  );
}

export default HomePage;
