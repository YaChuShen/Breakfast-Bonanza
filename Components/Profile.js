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
      <VStack>
        <Text>{data.name}</Text>
        <AvatarPicker profileId={profileId} avatar={data?.avatar} />
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
      </VStack>
    </CustomContainer>
  );
};

export default Profile;
