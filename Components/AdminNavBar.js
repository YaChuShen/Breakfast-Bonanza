import React from "react";
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
import Login from "Components/Login";

const AdminNavBar = ({ session }) => {
  return (
    <Box w='100%' bg='white' pos='relative'>
      {/* <Login session={session} /> */}
    </Box>
  );
};

export default AdminNavBar;
