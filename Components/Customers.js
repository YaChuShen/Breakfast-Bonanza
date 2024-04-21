import { Center, HStack, Image } from '@chakra-ui/react';
import { range } from 'lodash';
import React from 'react';
import { customers } from 'contents/rulse';
import dynamic from 'next/dynamic';

const CustomerTemplate = dynamic(() => import('Components/CustomerTemplate'), {
  ssr: false,
});

const Customers = ({ currentData, start }) => {
  return (
    <Center pt="3em" pos="relative">
      <Image src="./window.svg" w="70em" minW="70em" alt="game" />
      <HStack
        pos="absolute"
        zIndex={10}
        spacing={20}
        alignItems="center"
        justifyContent="center"
        py="20"
      >
        {range(customers).map((e, i) => (
          <CustomerTemplate
            wishFood={currentData[`customer${i + 1}`]?.order}
            status={currentData[`customer${i + 1}`]?.status}
            overtime={currentData[`customer${i + 1}`]?.overtime}
            id={`customer${i + 1}`}
            src={`customer${i + 1}`}
            key={e}
            start={start}
            className={i === 0 ? 'three-step' : ''}
          />
        ))}
      </HStack>
    </Center>
  );
};

export default Customers;
