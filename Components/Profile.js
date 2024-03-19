'use client';

import { Text, VStack } from '@chakra-ui/react';
import React from 'react';
import AvatarPicker from 'Components/AvatarPicker';
import CustomContainer from 'Components/CustomContainer';

const Profile = ({ data }) => {
  return (
    <CustomContainer>
      <VStack>
        <Text>{data.name}</Text>
        <AvatarPicker />
      </VStack>
    </CustomContainer>
  );
};

export default Profile;
