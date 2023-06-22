import {
  Box,
  Center,
  ChakraProvider,
  Container,
  HStack,
  Image,
  Text,
} from "@chakra-ui/react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import foodList from "../contents/foodList";
import { useForm } from "react-hook-form";

function HomePage() {
  const orderItem = "hotdog";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({ defaultValues: { customer1: "eggs" } });

  return (
    <ChakraProvider>
      <Container>
        <Center
          draggable='true'
          cursor='grab'
          // border='1px solid black'
          borderRadius='50%'
          w='5em'
          h='5em'>
          {/* <Text>我是蛋</Text> */}
          <Image src='/eggs.png'></Image>
        </Center>
        <Box
          mt='10'
          w='50%'
          h='20em'
          border='1px solid black'
          id='customer1'
          value={orderItem}
          onDragEnter={(e) => {
            console.log(e.target);
          }}
          // ondrop='drop_handler(event);'
          // ondragover='dragover_handler(event);'
        >
          Drop Zone
        </Box>
      </Container>
    </ChakraProvider>
  );
}

export default HomePage;
