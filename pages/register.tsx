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
  Container,
  Input,
  Stack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { string } from "prop-types";

const errorMessage = {
  email: "請提供正確的信箱",
  password: "請提供正確的信箱",
};

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const emailMessage = {
  pattern: "請檢查信箱格式",
  required: "請填寫信箱",
};

const passwordMessage = {
  pattern: "密碼請勿設定特殊符號，請設定英文或數字",
  required: "請設定密碼",
  minLength: "密碼至少要6碼",
};

const register = () => {
  // const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });

    const userInfo = await res.json();
  };
  console.log(errors);

  const emailType = errors?.email?.type;

  return (
    <Container maxW='2xl' pt='10em'>
      <Stack flex={1} justifyContent='center' w='100%' spacing={10} px='3em'>
        <Text textAlign='center' fontWeight={700} fontSize='30px'>
          Register for an account
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={5} w='100%'>
            <Input
              {...register("name", { required: true, maxLength: 12 })}
              bg='white'
              placeholder='name'></Input>
            <Input
              {...register("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              bg='white'
              placeholder='email address'></Input>
            <Input
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^[a-z0-9\.]+$/,
              })}
              bg='white'
              placeholder='password'></Input>
            <Button type='submit' w='100%'>
              SUBMIT
            </Button>
          </VStack>
          <VStack py='2' alignItems='start'>
            {errors.password && (
              <Text fontSize='14px' color='red.600'>
                {passwordMessage[errors.password.type ?? ""]}
              </Text>
            )}
            {errors.email && (
              <Text fontSize='14px' color='red.600'>
                {emailMessage[errors.email.type ?? ""]}
              </Text>
            )}
          </VStack>
        </form>
        <VStack>
          <Text> or sign in to your account</Text>
          {/* <Login session={session} /> */}
        </VStack>
      </Stack>
    </Container>
  );
};

export default register;
