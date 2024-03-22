import { Box, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

const Navbar = ({ profileId }) => {
  return (
    <Box
      zIndex={1}
      py="2"
      pos="fixed"
      right={1}
      top={36}
      w="100%"
      maxW="8em"
      px="2"
    >
      <Link href={`/profile/${profileId}`}>
        <Text cursor="pointer" _hover={{ color: 'red.500' }}>
          Profile
        </Text>
      </Link>
    </Box>
  );
};

export default Navbar;
