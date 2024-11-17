import { Text, VStack } from '@chakra-ui/react';

const TotalScore = ({ showLevelUpMessege, score }) => {
  return (
    <VStack w="100%" color="red.500" spacing={0}>
      <Text fontSize="40px">
        {showLevelUpMessege ? 'Level up !!' : 'Game over'}
      </Text>
      <Text fontSize="20px" color="gray.700">
        Your total scroe is
        <Text color="red.500" fontSize="50px" textAlign="center">
          {score}
        </Text>
      </Text>
    </VStack>
  );
};

export default TotalScore;
