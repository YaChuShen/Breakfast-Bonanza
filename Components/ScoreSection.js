import {
  Box,
  Divider,
  Text,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import Timer from 'Components/Timer';
import { IoIosArrowDown } from 'react-icons/io';
import Link from 'next/link';

const ScoreSection = ({ score, seconds, minutes, session }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(session);
  return (
    <Box
      pos="fixed"
      top={10}
      right={10}
      w="100%"
      maxW="8em"
      zIndex={2}
      color="gray.600"
    >
      <Box
        pos="relative"
        w="100%"
        boxShadow="md"
        bg="gray.50"
        py="2"
        px="2"
        borderTopRadius="13px"
        borderBottomRadius="8px"
        zIndex={2}
      >
        <VStack>
          <Timer seconds={seconds} minutes={minutes} />
          <Divider borderWidth="1px" />
          <Text fontSize="24px" fontWeight={700}>
            {score ?? 0}
          </Text>
        </VStack>
      </Box>
      {session && (
        <Box
          pos="relative"
          mt="-4"
          w="100%"
          bg="gray.100"
          zIndex={1}
          borderRadius="13px"
          onMouseEnter={onOpen}
        >
          <Menu matchWidth={true} boundary="scrollParent" isOpen={isOpen}>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<IoIosArrowDown color="gray" />}
              variant="ghost"
              border="none"
              w="100%"
              minH="2.5em"
              pt="5"
              borderRadius="13px"
              boxShadow="md"
              _focusVisible={{}}
            />
            <MenuList
              w="100%"
              minWidth="100%"
              onMouseLeave={onClose}
              borderRadius="13px"
            >
              <MenuItem justifyContent="center">
                <Link href={`/profile/${session.id}`}>
                  <Text>Profile</Text>
                </Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default ScoreSection;
