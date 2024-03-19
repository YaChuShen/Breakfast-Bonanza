'use client';

import { Circle, Image } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BiCamera } from 'react-icons/bi';
import { storage } from '../firebase.config';
import { getStorage, ref } from 'firebase/storage';

const AvatarPicker = () => {
  const prevUrl = useRef();
  const { register, handleSubmit, watch } = useForm({});
  const file = watch('avatar');
  const imagesRef = ref(storage, 'images');

  const avatarURL = useMemo(() => {
    if (file instanceof FileList && file[0]) {
      return URL.createObjectURL(file[0]);
    }
  }, [file]);

  useEffect(() => {}, [file]);

  const previewUrl = useMemo(() => {
    // let f = file;
    // if (file instanceof FileList && file[0]) {
    //   f = file[0];
    // }
    // if (f instanceof File || f instanceof Blob) {
    //   if (prevUrl.current) {
    //     console.log(URL.revokeObjectURL(prevUrl.current));
    //     URL.revokeObjectURL(prevUrl.current);
    //   }
    //   const url = URL.createObjectURL(f);
    //   prevUrl.current = url;
    //   return url;
    // }
    // if (typeof f === 'string' && f?.startsWith('https')) {
    //   return f;
    // }
    //上傳圖片按取消
    // if (f instanceof FileList && !file[0]) {
    //   return '';
    // }
  }, [file]);

  return (
    <Circle
      as="label"
      border="1px solid"
      borderColor="gray.500"
      borderRadius="50%"
      size="6em"
      overflow="hidden"
      role="button"
      bgImage={`url(${avatarURL})`}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      {!avatarURL && <BiCamera size="1.375em" color="gray" />}
      <input
        type="file"
        accept="image/*"
        hidden
        ref={prevUrl}
        {...register('avatar')}
      />
    </Circle>
  );
};

export default AvatarPicker;
