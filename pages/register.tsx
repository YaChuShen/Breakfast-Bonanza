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

type Inputs = {
  email: string;
  password: string;
  name: string;
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
                pattern: /^[a-z0-9\-_\.]+$/,
              })}
              bg='white'
              placeholder='password'></Input>
            <Button type='submit' w='100%'>
              SUBMIT
            </Button>
          </VStack>
          {errors.password && <span>This field is required</span>}
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
