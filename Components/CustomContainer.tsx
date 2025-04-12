'use client';

import { Container } from '@chakra-ui/react';
import React from 'react';

type CustomContainerProps = {
  children: React.ReactNode;
};

const CustomContainer = ({ children }: CustomContainerProps) => {
  return (
    <Container
      maxW="2xl"
      display="flex"
      justifyContent="center"
      alignItems="center"
      minH="100vh"
    >
      {children}
    </Container>
  );
};

export default CustomContainer;
