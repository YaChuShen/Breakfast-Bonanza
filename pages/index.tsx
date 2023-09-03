import {
  Box,
  Center,
  ChakraProvider,
  HStack,
  Image,
  Text,
  VStack,
  Button,
  Flex,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import values from "../helpers/customerForm";
import FoodTemplate from "../Components/FoodTemplate";
import dynamic from "next/dynamic";
import CookTemplate from "../Components/CookTemplate";
import Toaster from "../Components/Toaster";
import { range } from "lodash";
import Jam from "../Components/Jam";
import TrashCan from "../Components/TrashCan";
import Table from "../Components/Table";
import FoodPlateSection from "../Components/FoodPlateSection";
import PlateSection from "../Components/PlateSection";
import ScoreSection from "../Components/ScoreSection";
import { tool } from "../helpers/rwd";
import Login from "../Components/Login";
import { useSession, signIn, signOut } from "next-auth/react";
import React from "react";

// const CustomerTemplate = dynamic(
//   () => import("../Components/CustomerTemplate"),
//   {
//     ssr: false,
//   }
// );

const CustomerTemplate = dynamic(() =>
  import("../Components/CustomerTemplate").then((module) => module.default)
);

function HomePage() {
  const methods = useForm({ defaultValues: values });
  const data = methods.watch();
  const { data: session } = useSession();

  console.log(data);

  const toasterSection = (
    <HStack spacing={0}>
      <Toaster w='10em' tool={undefined} />

      <VStack>
        <Jam />
        <FoodTemplate value={"toast0"} src={"toast0"} w='6em' setCrackEggs={undefined} />
      </VStack>
    </HStack>
  );

  const cookSection = (
    <HStack spacing={0}>
      <CookTemplate tool={"pan"} w='13em' zIndex={1} />
      <FoodPlateSection />
    </HStack>
  );

  const coffee = <FoodTemplate value={"coffee"} src={"coffee"} setCrackEggs={undefined} />;
  return (
    <ChakraProvider>
      <FormProvider {...methods}>
        <Box w='100%' h='3em' pos='fixed' top={0} zIndex={1}>
          <Login session={session} />
        </Box>
        <ScoreSection data={data} />
        <Center pt='3em' pos='relative'>
          <Image src='./window.svg' w='70em' minW='70em' />
          <HStack
            pos='absolute'
            zIndex={10}
            spacing={20}
            alignItems='center'
            justifyContent='center'
            py='20'>
            {range(data.customer).map((e, i) => (
              <CustomerTemplate
                id={`customer${i + 1}`}
                src={`customer${i + 1}`}
                key={i}
              />
            ))}
          </HStack>
        </Center>
        <Box pos='relative' userSelect='none'>
          <Table />
          <Center>
            <PlateSection data={data} methods={methods} />
            <HStack pos='absolute' bottom={tool} spacing={10}>
              {toasterSection}
              {cookSection}
              {coffee}
              <TrashCan pos='absolute' left='-7em' />
            </HStack>
          </Center>
        </Box>
      </FormProvider>
    </ChakraProvider>
  );
}

export default HomePage;
