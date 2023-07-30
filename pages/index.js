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
        <Box bg='#F2DBC2' w='100%' h='100vh' overflow='hidden'>
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
                bottom='1em'
                pos='relative'
              />
            </Center>
            <Center>
              <HStack
                spacing={10}
                w='100%'
                justifyContent='center'
                pos='absolute'
                bottom='22em'>
                {range(data.plate).map((e, i) => (
                  <PlateSection
                    data={data}
                    setValue={methods.setValue}
                    index={e}
                    key={i}
                  />
                ))}
              </HStack>
              <HStack pos='absolute' bottom='9em' spacing={10}>
                <HStack spacing={0}>
                  <Toaster w='10em' />
                  <VStack>
                    <Jam />
                    <FoodTemplate value={"toast0"} src={"toast0"} w='6em' />
                  </VStack>
                </HStack>
                <HStack spacing={0}>
                  <CookTemplate tool={"pan"} w='13em' zIndex={1} />
                  <HStack pos='relative' spacing={1}>
                    <Box pos='absolute' w='10em' left={-5} bottom={-10}>
                      <Image src='/foodPlate.svg' />
                    </Box>
                    <FoodTemplate
                      value={"egg"}
                      src={"egg"}
                      w='3em'
                      zIndex={1}
                    />
                    <FoodTemplate
                      value={"hotDog0"}
                      src={"hotDog0"}
                      w='4.5em'
                      zIndex={1}
                    />
                  </HStack>
                </HStack>
                <FoodTemplate value={"coffee"} src={"coffee"} />
                <TrashCan pos='absolute' left='-7em' />
              </HStack>
            </Center>
          </Box>
        </Box>
      </FormProvider>
    </ChakraProvider>
  );
}

export default HomePage;
