'use client';

import { HStack, Icon, Link, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AvatarPicker from 'Components/AvatarPicker';
import CustomContainer from 'Components/CustomContainer';
import { FaArrowLeftLong } from 'react-icons/fa6';

const Profile = ({ data, profileId }) => {
  return (
    <CustomContainer>
      <Link href="/">
        <HStack>
          <Icon as={FaArrowLeftLong} />
          <Text>Back</Text>
        </HStack>
      </Link>
      <HStack
        w="100%"
        justifyContent="space-around"
        py="3em"
        bg="white"
        borderRadius="80px"
        mt="1em"
        border="10px solid #db542c"
      >
        <VStack>
          <Text>{data.name}</Text>
          <AvatarPicker profileId={profileId} avatar={data?.avatar} />
        </VStack>
        {data?.score?.length > 0 && (
          <VStack>
            <Text fontWeight={700} fontSize="18px">
              Record
            </Text>
            {data?.score.splice(0, 5).map((item) => (
              <Text key={item}>{item}</Text>
            ))}
          </VStack>
        )}
      </HStack>
    </CustomContainer>
  );
};

export default Profile;
