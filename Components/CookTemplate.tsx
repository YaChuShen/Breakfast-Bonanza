import { Box, Center, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import stoveList from '../contents/cookedList';
import Progress from './Progress';
import { MUTURITY_TIME, OVERTIME } from '../contents/rules';
import onDragEnter from '../helpers/cook/onDragEnter';
import onDrop from '../helpers/cook/onDrop';
import passToPlate from '../helpers/cook/passToPlate';
import { useDispatch } from 'react-redux';
import { setTargetItem } from 'store/features/plateSlice';
import { useSelector } from 'react-redux';
import { selectPlate } from 'store/features/plateSlice';
import smartSize from 'helpers/smartSize';
import { ResponsiveValue } from '@chakra-ui/react';


const statusList: Record<string, string> = {
  cooking: 'init',
  maturity: 'done',
  over: 'over',
};

type CookTemplateProps = {
  tool: string;
  w?: ResponsiveValue<string>;
  isLevel2: boolean;
  zIndex?: number;
};

type CookedGroup = {
  init: { value: string; src: string };
  done: { value: string; src: string };
  over: { value: string; src: string };
} | undefined;

const CookTemplate = ({ tool, w = '14em', isLevel2, ...props }: CookTemplateProps) => {
  const dispatch = useDispatch();
  const [cookedGroup, setCookedGroup] = useState<CookedGroup>();
  const [status, setStatus] = useState<string | null>(null);
  const isCooking = status === 'cooking';
  const isMaturity = status === 'maturity';
  const isOver = status === 'over';
  const key = status ? statusList[status] : undefined;
  const plateData = useSelector(selectPlate);
  const { targetItem } = plateData;

  useEffect(() => {
    if (isCooking) {
      const s = setTimeout(() => {
        setStatus('maturity');
      }, MUTURITY_TIME);
      return () => clearTimeout(s);
    }
    if (isMaturity) {
      const s = setTimeout(() => {
        setStatus('over');
      }, OVERTIME);
      return () => clearTimeout(s);
    }
  }, [status]);

  const foodOnDragStart = () => {
    if (isMaturity || isOver) {
      dispatch(
        setTargetItem({
          target: isOver ? cookedGroup?.over.value : cookedGroup?.done.value,
        })
      );
    }
  };

  const foodOnDragEnd = () => {
    if (targetItem === null) {
      setStatus(null);
    }
  };

  return (
    <Box
      {...props}
      onDragEnter={() =>
        onDragEnter(targetItem, status, isOver, stoveList, setCookedGroup)
      }
      onDrop={() => onDrop(targetItem, cookedGroup, status, setStatus)}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Box pos="relative" w={w}>
        <Image
          src={`/${tool}.svg`}
          pointerEvents={'none'}
          userSelect="none"
          w={w}
        />
        {(isCooking || isMaturity) && (
          <Progress
            time={MUTURITY_TIME / 20}
            pos="absolute"
            size="30px"
            top={5}
            left={0}
          />
        )}
        {status && (
          <Center
            pos="absolute"
            top={smartSize({ base: '5', lg: '6', isLevel2 })}
            left={smartSize({ base: '3em', lg: '3.6em', isLevel2 })}
            userSelect="none"
            pointerEvents={isCooking ? 'none' : undefined}
            draggable="true"
            onClick={() =>
              passToPlate(
                plateData,
                cookedGroup,
                isMaturity,
                setStatus,
                null,
                dispatch
              )
            }
            onDragStart={foodOnDragStart}
            onDragEnd={foodOnDragEnd}
            cursor="grab"
            borderRadius="50%"
          >
            <Image
              src={`/${cookedGroup?.[key as keyof NonNullable<CookedGroup>]?.src}.svg`}
              w={smartSize({ base: '3.5em', lg: '4.5em', isLevel2 })}
              alt="food"
            />
          </Center>
        )}
      </Box>
    </Box>
  );
};

export default CookTemplate;
