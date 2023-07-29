import {
  AspectRatio,
  Box,
  Center,
  ChakraProvider,
  Circle,
  Container,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import values from "../helpers/customerForm";
import FoodTemplate from "../Components/FoodTemplate";
// import CustomerTemplate from "../Components/CustomerTemplate";
import dynamic from "next/dynamic";
import CookTemplate from "../Components/CookTemplate";
import Toaster from "../Components/Toaster";
import PlateSection from "../Components/PlateSection";
import materialList from "../contents/materialList";
import { range } from "lodash";
import Jam from "../Components/Jam";
import TrashCan from "../Components/TrashCan";

const CustomerTemplate = dynamic(
  () => import("../Components/CustomerTemplate"),
  {
    ssr: false,
  }
);

const table = (
  <Center>
    <Image src='/table.svg' w='100em' minW='100em' pos='absolute' bottom='0' />
  </Center>
);

function HomePage() {
  const methods = useForm({ defaultValues: values });
  const data = methods.watch();

  console.log(data);

  const tools = (
    <HStack spacing={5} pos='relative'>
      <TrashCan />
      <CookTemplate tool={"pan"} />
      <Toaster w='11em' />
      <Jam />
    </HStack>
  );

  return (
    <ChakraProvider>
      <FormProvider {...methods}>
        <Box bg='gray.800' w='100%' h='100vh'>
          <HStack
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
          <Box pos='relative'>
            <Center>
              <Image
                src='/table.svg'
                w='100em'
                minW='100em'
                bottom='-7em'
                pos='relative'
              />
            </Center>
            <Center>
              <HStack
                spacing={10}
                w='100%'
                justifyContent='center'
                pos='absolute'
                bottom='12.5em'>
                {range(data.plate).map((e, i) => (
                  <PlateSection
                    data={data}
                    setValue={methods.setValue}
                    index={e}
                    key={i}
                  />
                ))}
              </HStack>
              <HStack pos='absolute' bottom='0em'>
                <Toaster w='10em' />
                <VStack>
                  <Jam />
                  <FoodTemplate value={"toast0"} src={"toast0"} w='8em' />
                  <FoodTemplate
                    value={"toast0"}
                    src={"toast0"}
                    w='8em'
                    pos='absolute'
                    top={24}
                  />
                </VStack>
                <CookTemplate tool={"pan"} />
                <VStack>
                  <FoodTemplate value={"egg"} src={"egg"} />
                  <FoodTemplate value={"hotDog0"} src={"hotDog0"} />
                </VStack>
                <FoodTemplate value={"coffee"} src={"coffee"} />
                <TrashCan />
              </HStack>
            </Center>
          </Box>
        </Box>
      </FormProvider>
    </ChakraProvider>
  );
}

export default HomePage;
