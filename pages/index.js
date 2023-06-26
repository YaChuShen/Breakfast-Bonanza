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
import PlateSection from "../Components/PlateSection";
import materialList from "../contents/materialList";
import { range } from "lodash";

const CustomerTemplate = dynamic(
  () => import("../Components/CustomerTemplate"),
  {
    ssr: false,
  }
);

function HomePage() {
  const methods = useForm({ defaultValues: values });
  const data = methods.watch();
  return (
    <ChakraProvider>
      <FormProvider {...methods}>
        <Box py="2em" bg="gray.800" w="100%" h="100vh">
          <Center h="full">
            <VStack spacing={15}>
              <HStack
                spacing={20}
                alignItems="center"
                justifyContent="center"
                py="20"
              >
                {range(2).map((e, i) => (
                  <CustomerTemplate
                    id={`customer${i + 1}`}
                    src={`customer${i + 1}`}
                    key={i}
                  />
                ))}
                <CustomerTemplate id="customer2" src="customer2" />
              </HStack>
              <PlateSection data={data} setValue={methods.setValue} />
              <VStack spacing={10}>
                <HStack>
                  <CookTemplate tool={"pan"} />
                  <Toster w="11em" />
                </HStack>
                <HStack spacing={10}>
                  {materialList.map((e) => (
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
