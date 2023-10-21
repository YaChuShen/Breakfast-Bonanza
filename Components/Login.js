import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";

const Login = ({ session }) => {
  return (
    <Box p='5'>
      {!session && (
        <Button onClick={signIn} bg='gray.500' color='white'>
          LogIn
        </Button>
      )}
      {session && (
        <Button
          onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}>
          Sign out
        </Button>
      )}
    </Box>
  );
};

export default Login;
