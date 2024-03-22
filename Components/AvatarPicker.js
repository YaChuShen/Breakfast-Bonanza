'use client';

import { Circle, Image } from '@chakra-ui/react';
import React, { useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { BiCamera } from 'react-icons/bi';
import { storage } from '../firebase.config';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import postMethod from 'helpers/postMethod';

const AvatarPicker = ({ profileId, avatar }) => {
  console.log(avatar);
  const prevUrl = useRef();
  const { register, handleSubmit, watch } = useForm({});
  const file = watch('avatar');

  useEffect(() => {
    const handleUpload = async () => {
      if (file instanceof FileList && file[0]) {
        const imagesRef = ref(storage, `${profileId}/avatar`);
        const upload = await uploadBytes(imagesRef, file[0]);
        const publicURL = await getDownloadURL(upload.ref);
        await postMethod({
          path: '/api/postAvatar',
          data: {
            profileId,
            publicURL,
          },
        });
      }
    };
    handleUpload();
  }, [file?.[0]]);

  const avatarURL = useMemo(() => {
    if (file instanceof FileList && file[0]) {
      return URL.createObjectURL(file[0]);
    }
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
      bgImage={`url(${avatar ?? avatarURL})`}
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
