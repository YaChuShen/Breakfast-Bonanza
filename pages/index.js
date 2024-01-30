import { Box, Center, HStack, Image, VStack } from '@chakra-ui/react';
import { FormProvider, useForm } from 'react-hook-form';
import values from 'helpers/customerForm';
import FoodTemplate from '../Components/FoodTemplate';
import dynamic from 'next/dynamic';
import CookTemplate from 'Components/CookTemplate';
import Toaster from 'Components/Toaster';
import { range } from 'lodash';
import Jam from 'Components/Jam';
import TrashCan from '../Components/TrashCan';
import Table from '../Components/Table';
import FoodPlateSection from '../Components/FoodPlateSection';
import PlateSection from '../Components/PlateSection';
import ScoreSection from '../Components/ScoreSection';
import { tool } from '../helpers/rwd';
import { useSession } from 'next-auth/react';
import React, { useMemo, useState } from 'react';
import Media from 'Components/Media';
import Gress1 from 'Components/Gress1';
import TimerBoard from 'Components/TimerBoard';
import LittleTree from 'Components/LittleTree';
import { useSelector } from 'react-redux';
import { seleteCustomer } from 'pages/features/customerSlice';
import defaultConfig from 'contents/rootConfig';

const CustomerTemplate = dynamic(
  () => import('../Components/CustomerTemplate'),
  {
    ssr: false,
  }
);

function HomePage() {
  const methods = useForm({ defaultValues: values });
  const data = methods.watch();
  const { data: session } = useSession();
  const [start, setStart] = useState(false);
  const currentData = useSelector(seleteCustomer);
  console.log(currentData);
  // console.log(data);
  console.log(data.customer);

  const toasterSection = (
    <HStack spacing={0}>
      <Toaster w="10em" tool={undefined} />
      <VStack>
        <Jam />
        <FoodTemplate
          value={'toast0'}
          src={'toast0'}
          w="6em"
          setCrackEggs={undefined}
        />
      </VStack>
    </HStack>
  );

  const materialSection = (
    <HStack spacing={0}>
      <CookTemplate tool={'pan'} w="13em" zIndex={1} />
      <FoodPlateSection />
      <Box pl="4">
        <FoodTemplate
          value={'coffee'}
          src={'coffee'}
          setCrackEggs={undefined}
        />
      </Box>
    </HStack>
  );

  const onSubmit = () => {
    methods?.reset();
  };

  return (
    <Media greaterThanOrEqual="md">
      <FormProvider {...methods}>
        <Box as="form">
          {/* <TimerBoard
            setStart={setStart}
            start={start}
            session={session}
            data={data}
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
                        id={`customer${i + 1}`}
                        src={`customer${i + 1}`}
                        key={e}
                        start={start}
                      />
                    ))}
                  </HStack>
                </Center>
                <Box pos="relative" userSelect="none">
                  <Gress1 />
                  <Table />
                  <Center>
                    <PlateSection data={data} methods={methods} />
                    <HStack pos="absolute" bottom={tool} spacing={10}>
                      <LittleTree />
                      {toasterSection}
                      {materialSection}
                      <TrashCan />
                    </HStack>
                  </Center>
                </Box>
              </>
            );
          }, [data])}
        </Box>
      </FormProvider>
    </Media>
  );
}

export default HomePage;
