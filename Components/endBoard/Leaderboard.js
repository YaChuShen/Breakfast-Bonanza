import { Box, Divider, Grid, Icon, Text, VStack } from '@chakra-ui/react';
import {
  TbSquareRoundedNumber1Filled,
  TbSquareRoundedNumber2Filled,
  TbSquareRoundedNumber3Filled,
  TbSquareRoundedNumber4Filled,
  TbSquareRoundedNumber5Filled,
} from 'react-icons/tb';

const numberIcon = {
  1: { icon: TbSquareRoundedNumber1Filled, color: 'yellow.400' },
  2: { icon: TbSquareRoundedNumber2Filled, color: 'gray.400' },
  3: { icon: TbSquareRoundedNumber3Filled, color: 'gray.600' },
  4: { icon: TbSquareRoundedNumber4Filled, color: 'gray.600' },
  5: { icon: TbSquareRoundedNumber5Filled, color: 'gray.600' },
};

const Leaderboard = ({ newRankBoard, endBoardVariants }) => {
  return (
    <VStack alignItems="flex-start" flex={1} {...endBoardVariants} bg="white">
      {newRankBoard?.map((item, i) => {
        return (
          <Box key={i} w="100%">
            <Grid templateColumns="30px 1fr 80px" gap={2}>
              <Icon
                as={numberIcon[item.rank].icon}
                w="1.5em"
                h="1.5em"
                color={numberIcon[item.rank].color}
              />
              <Text>{item.name}</Text>
              <Text textAlign="right">{item.score}</Text>
            </Grid>
            {i !== newRankBoard.length - 1 && <Divider pt="0.5em" />}
          </Box>
        );
      })}
    </VStack>
  );
};

export default Leaderboard;
