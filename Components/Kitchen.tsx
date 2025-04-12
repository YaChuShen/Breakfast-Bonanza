import {  HStack } from '@chakra-ui/react';
import React from 'react';
import ToasterSection from './ToasterSection';
import MaterialSection from './MaterialSection';
import RosemarryBowl from 'Components/RosemarryBowl';
import TrashCan from 'Components/TrashCan';

type KitchenProps = {
  isLevel2: boolean;
};

const Kitchen = ({ isLevel2 }: KitchenProps) => {
  return (
    <HStack
      spacing={0}
      pos="absolute"
      top="3em"
      w="100%"
      justifyContent="center"
    >
      <ToasterSection isLevel2={isLevel2} />
      <MaterialSection isLevel2={isLevel2} />
      {isLevel2 && <RosemarryBowl />}
      <TrashCan />
    </HStack>
  );
};

export default Kitchen;
