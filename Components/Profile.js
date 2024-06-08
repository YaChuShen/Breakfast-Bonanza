'use client';

import {
  HStack,
  Icon,
  Link,
  Text,
  VStack,
  Divider,
  IconButton,
  Center,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import AvatarPicker from 'Components/AvatarPicker';
import CustomContainer from 'Components/CustomContainer';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaLinkedin } from 'react-icons/fa';
import { FaSquareGithub } from 'react-icons/fa6';

const Profile = ({ data, profileId }) => {
  return (
    <CustomContainer>
      <Link href="/">
        <HStack>
          <Icon as={FaArrowLeftLong} />
          <Text>Back</Text>
        </HStack>
      </Link>
      <Flex w="100%" justifyContent="center" alignItems="center">
        <VStack
          w="100%"
          justifyContent="space-around"
          pb="3em"
          bg="white"
          borderRadius="80px"
          mt="1em"
          boxShadow="lg"
        >
          <VStack
            bg="gray.100"
            w="100%"
            borderTopRadius="80px"
            borderBottomRadius="40px"
            py="2em"
          >
            <Text fontSize="24px" fontWeight={900} color="gray.600">
              {data.isLevel2 ? 'Level 2' : 'Level 1'}
            </Text>
            <AvatarPicker profileId={profileId} avatar={data?.avatar} />
            <VStack spacing={0} py="0.5em">
              <Text fontWeight={700} color="gray.600" fontSize="20px">
                {data.name}
              </Text>
              <Text fontSize="14px" color="gray.500">
                {data.email}
              </Text>
            </VStack>
          </VStack>
          {data?.score?.length > 0 && (
            <VStack pt="1em">
              <Text fontWeight={700} fontSize="18px">
                Record
              </Text>
              {data?.score.splice(0, 5).map((item) => (
                <Text key={item}>{item}</Text>
              ))}
            </VStack>
          )}
          <HStack pt="2em">
            <IconButton as={FaLinkedin} color="gray.700" />
            <IconButton as={FaSquareGithub} color="gray.700" />
          </HStack>
        </VStack>
      </Flex>
    </CustomContainer>
  );
};

export default Profile;
