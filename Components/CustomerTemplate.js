import { Box, Center, Circle, Image, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import foodList from 'contents/foodList';
import { isEqual, over, sample } from 'lodash';
import { CUSTOMERNEXTORDER, CUSTOMEROVERTIME } from 'contents/rulse';
import scoreList from 'contents/scoreList';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  handleOvertime,
  handleCustomStatus,
  getNextOrder,
} from 'pages/features/customerSlice';
import {
  addFood,
  setTargetItem,
  setTargetPlate,
} from '../pages/features/plateSlice';
import { seletePlate } from 'pages/features/plateSlice';
import { useSelector } from 'react-redux';

const MotionComponent = motion(Box);

const statusColor = {
  eating: '#EDDDD6',
  waiting: '#92AA8D',
  errors: '#CE5242',
};

const circleW = 9.56;
const customerW = 9;

const CustomerImg = ({ src }) => {
  return (
    <Image
      top={1}
      left={2}
      pos="absolute"
      src={`${src}.svg`}
      w={`${customerW}em`}
      alt=""
    />
  );
};

const CustomerTemplate = ({ wishFood, id, src, start }) => {
  const { setValue, watch } = useFormContext();
  const data = watch();
  const status = data[id].status;
  const overTime = data[id].overtime;
  const isCoffee = wishFood === 'coffee';
  const [getScoreAni, setGetScoreAni] = useState();
  const targetScore = scoreList[data.targetItem];
  const plateData = useSelector(seletePlate);

  const dispatch = useDispatch();

  const getScore = () => {
    setValue('score', (data.score += targetScore));
  };

  const minusScore = () => {
    setValue('score', (data.score -= 30));
  };

  useEffect(() => {
    const controlTime = (s, time) => {
      if (status === s && !overTime) {
        const t = setTimeout(() => {
          setValue(`${id}.status`, 'waiting');
        }, [time]);
        return () => clearTimeout(t);
      }
    };
    controlTime('errors', 1000);
    controlTime('eating', 5000);
  }, [status]);

  useEffect(() => {
    if (!overTime && start) {
      const t = setTimeout(() => {
        setValue(`${id}.overtime`, true);
        minusScore();
        setGetScoreAni(true);
        setValue(`${id}.status`, 'errors');
      }, [CUSTOMEROVERTIME]);

      if (status === 'eating') clearTimeout(t);

      return () => clearTimeout(t);
    }
  }, [overTime, start, status]);

  const handleValidateFood = () => {
    if (wishFood.includes('&')) {
      const checkContent = (s) => {
        return s?.split('&');
      };
      return isEqual(
        checkContent(plateData.targetItem)?.sort(),
        checkContent(wishFood)?.sort()
      );
    } else {
      return wishFood === plateData.targetItem;
    }
  };

  const controlNextOrder = () => {
    setTimeout(() => {
      setValue(`${id}.order`, sample(foodList));
    }, [CUSTOMERNEXTORDER]);
  };

  useEffect(() => {
    if (getScoreAni) {
      setTimeout(() => {
        setGetScoreAni(false);
      }, [500]);
    }
  }, [getScoreAni]);

  const submitOrder = () => {
    dispatch(handleOvertime({ id, status: false }));
    dispatch(handleCustomStatus({ id, status: 'eating' }));
    setTimeout(() => {
      dispatch(getNextOrder({ id }));
    }, [CUSTOMERNEXTORDER]);

    setValue(`${id}.overtime`, false);
    setValue(`${id}.status`, 'eating');
    // controlNextOrder();
    getScore();
    setGetScoreAni(true);
  };

  const failureSubmit = () => {
    if (status === 'eating') return;
    setValue(`${id}.status`, 'errors');
    minusScore();
    setGetScoreAni(true);
  };

  return (
    <Box
      userSelect="none"
      onDrop={(e) => {
        e.preventDefault();
        const key = `plateContent${data?.targetPlate}`;
        if (handleValidateFood()) {
          submitOrder();
        } else {
          failureSubmit();
        }
        setValue(key, []);
        setValue('targetPlate', null);
        dispatch(addFood({ id: plateData.targetPlate, targetItem: [] }));
        dispatch(setTargetPlate({ index: null }));
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      pos="relative"
    >
      <Box pos="absolute" bottom="70%" left="-30%">
        {getScoreAni && (
          <MotionComponent
            initial={{ opacity: 0.2, x: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.3 },
            }}
            transition={{ duration: 0.2, stiffness: 200 }}
          >
            {status === 'eating' && (
              <Text fontSize="20px" fontWeight={900} color="green.500">
                {`+${targetScore}`}
              </Text>
            )}
            {status === 'errors' && (
              <Text fontSize="20px" fontWeight={900} color="red.500">
                - 30
              </Text>
            )}
          </MotionComponent>
        )}
      </Box>
      <Center
        visibility={status !== 'eating' ? 'visible' : 'hidden'}
        w={isCoffee ? '3em' : '7em'}
        h="4em"
      >
        <Image src={`/${wishFood}.svg`} w="100%" zIndex={2} />
      </Center>
      <Circle
        bg={statusColor[status]}
        w={`${circleW}em`}
        h={`${circleW}em`}
        pos="relative"
      >
        {overTime ? (
          <CustomerImg src={`${src}-angry`} />
        ) : (
          <CustomerImg src={src} />
        )}
      </Circle>
    </Box>
  );
};

export default CustomerTemplate;
