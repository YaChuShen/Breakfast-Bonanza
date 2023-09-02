import React from "react";
import Login from "../Components/Login";
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

const register = ({ session }) => {
  return (
    <Box w='100%' h='3em' pos='fixed' top={0} zIndex={1}>
      <Login session={session} />
    </Box>
  );
};

export default register;
