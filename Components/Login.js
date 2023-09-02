import React from "react";
import { Box, Button } from "@chakra-ui/react";
import { signIn, signOut } from "next-auth/react";

const Login = ({ session }) => {
  return (
    <Box w='100%'>
      {!session && (
        <Button onClick={signIn} w='100%'>
          Log In
        </Button>
      )}
      {session && (
        <Button
          onClick={() => signOut({ callbackUrl: "http://localhost:3000" })}
          w='100%'>
          Sign out
        </Button>
      )}
    </Box>
  );
};

export default Login;
