import {
  Box,
  Center,
  ChakraProvider,
  Circle,
  Container,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import values from "../helpers/customerForm";
import FoodTemplate from "../Components/FoodTemplate";
// import CustomerTemplate from "../Components/CustomerTemplate";
import dynamic from "next/dynamic";
import CookTemplate from "../Components/CookTemplate";
import Toster from "../Components/Toster";
import Plate from "../Components/Plate";

const CustomerTemplate = dynamic(
  () => import("../Components/CustomerTemplate"),
  {
    ssr: false,
  }
);

const materialArr = ["egg", "coffee", "hotDog0", "toast0"];

function HomePage() {
  const methods = useForm({ defaultValues: values });
  const data = methods.watch();

  console.log(data);
  return (
    <ChakraProvider>
      <FormProvider {...methods}>
        <Box py='2em' bg='gray.50' w='100%'>
          <Center>
            <VStack>
              <HStack spacing={10} alignItems='center' justifyContent='center'>
                <CustomerTemplate id='customer1' src='customer1' />
                <CustomerTemplate id='customer2' src='customer2' />
              </HStack>
              <Plate data={data} setValue={methods.setValue} />
              <VStack pt='8em' spacing={10}>
                <HStack>
                  <CookTemplate tool={"pan"} />
                  <Toster w='11em' />
                </HStack>
                <HStack spacing={10}>
                  {materialArr.map((e) => (
                    <FoodTemplate value={e} src={e} />
                  ))}
                </HStack>
              </VStack>
            </VStack>
          </Center>
        </Box>
      </FormProvider>
    </ChakraProvider>
  );
}

export default HomePage;
