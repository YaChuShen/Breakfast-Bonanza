import { Text, VStack } from '@chakra-ui/react';

const TotalScore = ({
  showLevelUpMessege,
  score,
  isEnterLeaderboard,
  isLogin,
}) => {
  return (
    <VStack w="100%" color="red.500" spacing={0}>
      <Text fontSize="36px">
        {showLevelUpMessege ? 'Level up !!' : 'Game over'}
      </Text>
      <Text fontSize="20px" color="gray.700">
        Your total scroe is
        <Text
          color="red.500"
          fontSize={{ lg: '40px', '2xl': '50px' }}
          textAlign="center"
        >
          {score}
        </Text>
      </Text>
      <Text textAlign="center" fontWeight={500} color="gray.700">
        {isEnterLeaderboard ? (
          isLogin ? (
            <Text as="span">
              {`You've made it to the top`}{' '}
              <Text as="span" fontWeight={800} fontSize="30px" color="red.500">
                {isEnterLeaderboard}
              </Text>{' '}
              of the leaderboard!
            </Text>
          ) : (
            `You've made it to the top 5 !! Sign Up now to secure your impressive record.`
          )
        ) : (
          !isLogin && 'Sign up to save your score!'
        )}
      </Text>
    </VStack>
  );
};

export default TotalScore;
