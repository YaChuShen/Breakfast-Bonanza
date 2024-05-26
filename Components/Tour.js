'use-client';

import React, { useEffect, useState } from 'react';
import { TourProvider, useTour, components } from '@reactour/tour';
import { RxCross2 } from 'react-icons/rx';
import { Icon, Button, Text, useEditable, Box, VStack } from '@chakra-ui/react';
import { HiArrowSmRight, HiArrowSmLeft } from 'react-icons/hi';
import postMethod from 'helpers/postMethod';

const CheckAlreadyRead = () => {
  const { setIsOpen } = useTour();
  const [alreadyRead, setAlreadyRead] = useState();

  useEffect(() => {
    if (window && sessionStorage.getItem('isTour')) {
      setIsOpen(false);
    }
  }, []);
};

function Badge({ children }) {
  return (
    <components.Badge
      styles={{ badge: (base) => ({ ...base, backgroundColor: 'gray' }) }}
    >
      {children}
    </components.Badge>
  );
}

function Close({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ position: 'absolute', right: 15, top: 10 }}
    >
      <Icon as={RxCross2}></Icon>
    </button>
  );
}

function Content({ content, currentStep }) {
  return (
    <VStack spacing={4} pt="4" key={currentStep}>
      <Text fontSize="14px">{content}</Text>
      <video autoPlay muted playsInline loop width={130}>
        <source src={`${currentStep + 1}.mp4`} type="video/mp4" />
      </video>
    </VStack>
  );
}

const steps = [
  {
    selector: '.first-step',
    content: 'Drag the egg into the pen',
  },
  {
    selector: '.two-step',
    content: 'And drag the cooked food on the plate',
  },
  {
    selector: '.three-step',
    content: 'If your meal is done, drag to the customer! Finish!',
  },
  {
    selector: '.four-step',
    content: `When the toast is done, click the toaster's button and then click again to the customer`,
  },
  {
    selector: '.fifth-step',
    content: '5',
  },
];

const Tour = ({ children, profileId }) => {
  return (
    <TourProvider
      steps={steps}
      disableInteraction
      onClickMask={() => {
        if (steps) {
          return;
        }
      }}
      onClickHighlighted={(e) => {
        e.stopPropagation();
      }}
      styles={{
        popover: (base) => ({
          ...base,
          borderRadius: '20px',
        }),
        maskArea: (base) => ({ ...base, rx: '20px' }),
      }}
      padding={{
        popover: [20, 100],
      }}
      showDots={false}
      components={{ Badge, Close, Content }}
      disableDotsNavigation={false}
      prevButton={({ currentStep, setCurrentStep }) => {
        const first = currentStep === 0;
        return (
          <Button
            variant="ghost"
            visibility={first ? 'hidden' : 'flex'}
            isDisabled={false}
            onClick={() => {
              setCurrentStep((s) => (s === 0 ? 0 : s - 1));
            }}
          >
            <Icon as={HiArrowSmLeft} w="1.5em" h="1.5em" color="gray.500" />
          </Button>
        );
      }}
      nextButton={({
        currentStep,
        stepsLength,
        setIsOpen,
        setCurrentStep,
        steps,
      }) => {
        const last = currentStep === stepsLength - 1;
        return (
          <Button
            mt="0"
            variant="ghost"
            isDisabled={false}
            size="sm"
            onClick={async () => {
              if (last) {
                await postMethod({
                  path: '/api/tour',
                  data: {
                    profileId,
                  },
                });
                setIsOpen(false);
                window.sessionStorage.setItem('isTour', true);
              } else {
                setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
              }
            }}
          >
            {last ? (
              <Text color="gray.500">Start Game</Text>
            ) : (
              <Icon as={HiArrowSmRight} w="1.5em" h="1.5em" color="gray.500" />
            )}
          </Button>
        );
      }}
    >
      {children}
      <CheckAlreadyRead />
    </TourProvider>
  );
};

export default Tour;
