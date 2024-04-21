import { HStack } from '@chakra-ui/react';
import React from 'react';
import LittleTree from 'Components/LittleTree';
import ToasterSection from './ToasterSection';
import MaterialSection from './MaterialSection';
import RosemarryBowl from 'Components/RosemarryBowl';
import TrashCan from 'Components/TrashCan';
import { tool } from 'helpers/rwd';

const Kitchen = ({ level2 }) => {
  return (
    <HStack pos="absolute" bottom={tool} spacing={0}>
      <LittleTree />
      <ToasterSection level2={level2} />
      <MaterialSection />
      {level2 && <RosemarryBowl />}
      <TrashCan />
    </HStack>
  );
};

export default Kitchen;
