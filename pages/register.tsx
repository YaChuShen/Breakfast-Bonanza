'use client';

import React, { useState } from 'react';
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
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { string } from 'prop-types';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  emailMessage,
  passwordMessage,
} from 'contents/emailPasswordErrorMessage';

type Inputs = {
  email: string;
  password: string;
  name: string;
};

const Index = () => {
  // const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    console.log(data);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    const userInfo = await res.json();
    signIn('credentials', {
      ...userInfo,
      callbackUrl: '/',
    })
      .then((res) => {
        router.push('/');
      })
      .catch((error) => {
        router.push('/');
        console.log(error);
        // 處理網絡錯誤或其他問題
      });

    setLoading(false);
    // router.push('/');
  };

  // const emailType = errors?.email?.type;

  return (
    <Container maxW="2xl" pt="10em">
      <Stack flex={1} justifyContent="center" w="100%" spacing={10} px="3em">
        <Text textAlign="center" fontWeight={700} fontSize="30px">
          Sign Up
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={5} w="100%">
            <Input
              {...register('name', { required: true, maxLength: 12 })}
              bg="white"
              placeholder="name"
            ></Input>
            <Input
              {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
              bg="white"
              placeholder="email address"
            ></Input>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                bg="white"
                type={show ? 'text' : 'password'}
                placeholder="Min. 6 characters including numbers and letters"
                {...register('password', {
                  required: true,
                  minLength: 6,
                  pattern: /^[a-z0-9\.]+$/,
                })}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button type="submit" w="100%">
              SUBMIT
            </Button>
          </VStack>
          <VStack py="2" alignItems="start">
            {errors.password && (
              <Text fontSize="14px" color="red.600">
                {passwordMessage[errors.password.type ?? '']}
              </Text>
            )}
            {errors.email && (
              <Text fontSize="14px" color="red.600">
                {emailMessage[errors.email.type ?? '']}
              </Text>
            )}
          </VStack>
        </form>
        <HStack>
          <Text> Already have an account?</Text>
          <Link href="/auth/signin">
            <Text
              cursor="pointer"
              textDecoration="underline"
              color="red.500"
              onClick={() => router.push('auth/signin')}
            >
              Go to login
            </Text>
          </Link>
        </HStack>
      </Stack>
    </Container>
  );
};

export default Index;
