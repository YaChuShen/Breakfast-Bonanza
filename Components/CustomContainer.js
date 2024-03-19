'use client';

import { Container } from '@chakra-ui/react';
import React from 'react';

const CustomContainer = ({ children }) => {
  return (
    <Container maxW="2xl" pt="10em">
      {children}
    </Container>
  );
};

export default CustomContainer;
