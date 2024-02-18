import { Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { trashCanNoList } from '../contents/rulse';
import { selectGameConfig, trashCanOpen } from 'pages/features/gameConfigSlice';
import { useSelector } from 'react-redux';
import { selectPlate } from 'pages/features/plateSlice';
import { useDispatch } from 'react-redux';
import {
  addFood,
  setTargetItem,
  setTargetPlate,
} from 'pages/features/plateSlice';

const TrashCan = ({ ...props }) => {
  const { setValue, watch } = useFormContext();
  const dispatch = useDispatch();
  const { trashCanOpen } = useSelector(selectGameConfig);
  const { targetPlate, targetItem } = useSelector(selectPlate);
  console.log(trashCanOpen);

  const [open, setOpen] = useState();

  useEffect(() => {
    if (!open && trashCanOpen) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        // setValue('trashCanOpen', false);
        dispatch('trashCanOpen', { value: false });
      }, 1500);
    }
  }, [trashCanOpen]);

  console.log('targetPlate', targetPlate);
  console.log('targetItem', targetItem);

  const onDrop = () => {
    if (!trashCanNoList.includes(targetItem) && open) {
      if (targetPlate) {
        // const key = `plateContent${targetPlate}`;
        // setValue(key, []);
        dispatch(addFood({ id: targetPlate, targetItem: [] }));
        // setValue('targetPlate', null);
        dispatch(setTargetPlate({ index: null }));
      }
      dispatch(setTargetItem({ target: null }));
      // setValue('targetItem', null);
      setOpen(false);
    } else return false;
  };

  return (
    <Box
      pos="absolute"
      left="-7em"
      userSelect="none"
      onDragLeave={() => {
        setOpen(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }}
      {...props}
      onDrop={onDrop}
    >
      {open ? (
        <Image src="/trashCan_open.svg" w="7em" pointerEvents="none" />
      ) : (
        <Image
          src="/trashCan.svg"
          w="7em"
          cursor={'pointer'}
          pointerEvents="none"
        />
      )}
    </Box>
  );
};

export default TrashCan;
