import {
  Box,
  Center,
  ChakraProvider,
  Circle,
  Container,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import values from "../helpers/customerForm";
import FoodTemplate from "../Components/FoodTemplate";
// import CustomerTemplate from "../Components/CustomerTemplate";
import dynamic from "next/dynamic";
import Pan from "../Components/Pan";

const CustomerTemplate = dynamic(
  () => import("../Components/CustomerTemplate"),
  {
    ssr: false,
  }
);

function HomePage() {
  const methods = useForm({ defaultValues: values });
  return (
    <ChakraProvider>
      <FormProvider {...methods}>
        <Container py='2em' bg='gray'>
          <HStack spacing={10}>
            <CustomerTemplate id='customer1' src='customer1' />
            <CustomerTemplate id='customer2' src='customer2' />
          </HStack>
          <Box pt='8em'>
            <Pan />
            <HStack spacing={10}>
              <FoodTemplate value='egg' src='egg' svg />
              <FoodTemplate value='coffee' src='coffee' w='3.5em' svg />
              <FoodTemplate value='hotDog' src='hotDog' svg />
              <FoodTemplate value='toast' src='toast' svg />
            </HStack>
          </Box>
        </Container>
      </FormProvider>
    </ChakraProvider>
  );
}

export default HomePage;
