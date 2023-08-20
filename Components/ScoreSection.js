import { Box, Text } from "@chakra-ui/react";
import React from "react";

const ScoreSection = ({ data }) => {
  return (
    <Box
      zIndex={1}
      boxShadow='md'
      bg='gray.50'
      px='10'
      py='2'
      pos='fixed'
      right={10}
      top={10}
      borderRadius='13px'>
      <Text fontSize='24px' fontWeight={700} color='gray.600'>
        {data.score}
      </Text>
    </Box>
  );
};

export default ScoreSection;
