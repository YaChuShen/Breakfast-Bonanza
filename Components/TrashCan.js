import { Box, Image } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { trashCanNoList } from "../contents/rulse";

const TrashCan = ({ ...props }) => {
  const { setValue, watch } = useFormContext();
  const { targetPlate, targetItem, trashCanOpen } = watch();
  const [open, setOpen] = useState();

  useEffect(() => {
    if (!open && trashCanOpen) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        setValue("trashCanOpen", false);
      }, 1500);
    }
  }, [trashCanOpen]);

  const onDrop = () => {
    if (!trashCanNoList.includes(targetItem) && open) {
      if (targetPlate) {
        const key = `plateContent${targetPlate}`;
        setValue(key, []);
        setValue("targetPlate", null);
      }
      setValue("targetItem", null);
      setOpen(false);
    } else return false;
  };

  return (
    <Box
      pos='absolute'
      left='-7em'
      userSelect='none'
      onDragLeave={() => {
        setOpen(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(true);
      }}
      {...props}
      onDrop={onDrop}>
      {open ? (
        <Image src='/trashCan_open.svg' w='7em' pointerEvents='none' />
      ) : (
        <Image
          src='/trashCan.svg'
          w='7em'
          cursor={"pointer"}
          pointerEvents='none'
        />
      )}
    </Box>
  );
};

export default TrashCan;
