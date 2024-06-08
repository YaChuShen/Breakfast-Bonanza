'use client';

import { Container, Flex } from '@chakra-ui/react';
import React from 'react';

const CustomContainer = ({ children }) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      minHeight={{ base: '85vh', xl: '100vh' }}
    >
      <Container maxW="xl" alignItems="center">
        {children}
      </Container>
    </Flex>
  );
};

export default CustomContainer;
