import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

const MotionComponent = motion(Box);

const StartBoard = ({ setStart, session, timerStart }, ...props) => {
  const router = useRouter();

  return (
    <MotionComponent
      w="80%"
      py={{ md: "5em", xl: "7em" }}
      bg="rgba(255, 255, 255, 0.9)"
      pos="fixed"
      top="10%"
      left="10%"
      zIndex={20}
      initial={{ opacity: 0.2, x: 0, y: -600, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{
        opacity: 0,
        y: -300,
        scale: 0.8,
        transition: { duration: 0.3, type: "spring" },
      }}
      transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
      borderRadius="80px"
      border="10px solid #db542c"
      {...props}
    >
      <VStack w="100%" spacing={10}>
        <VStack w="100%">
          <Image src="/breakfast_bonanza_logo.svg" w="60%" />
          <Text color="red.500" fontSize="24px" fontWeight={700}>
            Produce Maximum Breakfasts in Limited Time
          </Text>
        </VStack>
        {session && (
          <Text color="gray.700" fontWeight={700}>
            {`Hi ${session?.user?.name} Let's to start the game!`}
          </Text>
        )}
        <Button
          onClick={() => {
            setStart(true);
            timerStart();
          }}
          bg="red.500"
          color="white"
          fontSize="24px"
          py="5"
          px="10"
          size="xl"
          borderRadius="20px"
          letterSpacing="1px"
          _hover={{ bg: "red.700", color: "white" }}
          fontWeight={900}
        >
          START
        </Button>
        <VStack spacing={0} pt="10">
          {session ? (
            <Text onClick={signOut} textDecoration="underline" cursor="pointer">
              logout
            </Text>
          ) : (
            <VStack justifyContent="start" alignItems="start">
              <Text>
                Already have an account?{" "}
                <Text
                  cursor="pointer"
                  as="span"
                  textDecoration="underline"
                  color="red.500"
                  onClick={signIn}
                >
                  LogIn
                </Text>
              </Text>
              <HStack>
                <Text as="span">or </Text>
                <Text
                  as="span"
                  textDecoration="underline"
                  color="red.500"
                  cursor="pointer"
                  onClick={() => router.push("/register")}
                >
                  Register for an account
                </Text>
              </HStack>
            </VStack>
          )}
        </VStack>
      </VStack>
    </MotionComponent>
  );
};

export default StartBoard;
