'use-client';

import React, { useEffect } from 'react';
import { TourProvider, useTour, components } from '@reactour/tour';
import { RxCross2 } from 'react-icons/rx';
import { Icon, Button, Text, useEditable } from '@chakra-ui/react';
import { HiArrowSmRight, HiArrowSmLeft } from 'react-icons/hi';
import postMethod from 'helpers/postMethod';

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
      style={{ position: 'absolute', right: 15, top: 5 }}
    >
      <Icon as={RxCross2}></Icon>
    </button>
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
        popover: [0, 25],
      }}
      showDots={false}
      components={{ Badge, Close }}
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
            variant="ghost"
            isDisabled={false}
            onClick={async () => {
              if (last) {
                await postMethod({
                  path: '/api/tour',
                  data: {
                    profileId,
                  },
                });

                setIsOpen(false);
              } else {
                setCurrentStep((s) => (s === steps?.length - 1 ? 0 : s + 1));
              }
            }}
          >
            {last ? (
              <Text color="red.500">Start Game</Text>
            ) : (
              <Icon as={HiArrowSmRight} w="1.5em" h="1.5em" color="gray.500" />
            )}
          </Button>
        );
      }}
    >
      {children}
    </TourProvider>
  );
};

export default Tour;
