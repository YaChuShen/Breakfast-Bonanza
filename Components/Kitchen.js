import { HStack } from '@chakra-ui/react';
import React from 'react';
import LittleTree from 'Components/LittleTree';
import ToasterSection from './ToasterSection';
import MaterialSection from './MaterialSection';
import RosemarryBowl from 'Components/RosemarryBowl';
import TrashCan from 'Components/TrashCan';
import { tool } from 'helpers/rwd';

const Kitchen = ({ isLevel2 }) => {
  return (
    <HStack pos="absolute" bottom={tool} spacing={0}>
      <LittleTree />
      <ToasterSection isLevel2={isLevel2} />
      <MaterialSection isLevel2={isLevel2} />
      {isLevel2 && <RosemarryBowl />}
      <TrashCan />
    </HStack>
  );
};

export default Kitchen;
