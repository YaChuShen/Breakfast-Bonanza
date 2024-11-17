import {
  Box,
  Center,
  Divider,
  IconButton,
  SlideFade,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Timer from 'Components/Timer';
import { MdArrowDropDown } from 'react-icons/md';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

const ScoreSection = ({ score, seconds, minutes, profileId, isSingin }) => {
  const { isOpen, onToggle, onOpen } = useDisclosure();

  return (
    <Box
      zIndex={1}
      boxShadow="md"
      bg="gray.50"
      pt="2"
      pos="fixed"
      right={10}
      top={10}
      w="100%"
      maxW="8em"
      borderRadius="13px"
    >
      <VStack>
        <Timer seconds={seconds} minutes={minutes} />
        <Divider borderWidth="1px" />
        <Text fontSize="24px" fontWeight={700} color="gray.600">
          {score ?? 0}
        </Text>
      </VStack>
      {isSingin && (
        <Center borderRadius="13px" flexDirection="column" pt="2" w="full">
          <IconButton
            as={MdArrowDropDown}
            w="full"
            size="xs"
            onClick={onToggle}
            cursor="pointer"
            borderRadius="none"
            borderBottomRadius="xl"
            onMouseEnter={() => onOpen()}
          />
          {isOpen && (
            <Box w="full">
              <SlideFade
                in={isOpen}
                transition={{
                  enter: { duration: 0.5 },
                  exit: { duration: 0.5 },
                }}
              >
                <VStack
                  w="full"
                  textAlign="center"
                  cursor="pointer"
                  userSelect="none"
                  py="2"
                  fontWeight={500}
                >
                  <Link href={`/profile/${profileId}`}>
                    <Text
                      _hover={{
                        color: 'gray.400',
                      }}
                    >
                      Profile
                    </Text>
                  </Link>
                  <Divider />
                  <Text
                    _hover={{
                      color: 'gray.400',
                    }}
                    onClick={() => signOut()}
                  >
                    Logout
                  </Text>
                </VStack>
              </SlideFade>
            </Box>
          )}
        </Center>
      )}
    </Box>
  );
};

export default ScoreSection;
