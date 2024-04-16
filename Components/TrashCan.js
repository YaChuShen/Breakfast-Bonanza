import { Box, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { trashCanNoList } from '../contents/rulse';
import {
  selectGameConfig,
  handleTrashCan,
} from 'store/features/gameConfigSlice';
import { useSelector } from 'react-redux';
import { selectPlate } from 'store/features/plateSlice';
import { useDispatch } from 'react-redux';
import {
  addFood,
  setTargetItem,
  setTargetPlate,
} from 'store/features/plateSlice';

const TrashCan = ({ ...props }) => {
  const dispatch = useDispatch();
  const { trashCanOpen } = useSelector(selectGameConfig);
  const { targetPlate, targetItem } = useSelector(selectPlate);

  const [open, setOpen] = useState();

  useEffect(() => {
    if (!open && trashCanOpen) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        dispatch(handleTrashCan({ value: false }));
      }, 1500);
    }
  }, [trashCanOpen]);

  const onDrop = () => {
    if (!trashCanNoList.includes(targetItem) && open) {
      if (targetPlate) {
        dispatch(addFood({ id: targetPlate, targetItem: [] }));
        dispatch(setTargetPlate({ index: null }));
      }
      dispatch(setTargetItem({ target: null }));
      setOpen(false);
    } else return false;
  };

  return (
    <Box
      pos="absolute"
      right="-7"
      top="-4em"
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
      w="6em"
      className="fifth-step"
    >
      {open ? (
        <Image src="/trashCan_open.svg" pointerEvents="none" alt="" />
      ) : (
        <Image
          src="/trashCan.svg"
          cursor="pointer"
          pointerEvents="none"
          alt=""
        />
      )}
    </Box>
  );
};

export default TrashCan;
