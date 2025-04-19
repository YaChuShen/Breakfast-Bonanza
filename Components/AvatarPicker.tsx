'use client';

import { Circle, Spinner } from '@chakra-ui/react';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiCamera } from 'react-icons/bi';
import { storage } from '../firebase.config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import postMethod from 'helpers/postMethod';
import { useSession } from 'next-auth/react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

interface AvatarPickerProps {
  profileId: string;
  avatar?: string;
}

interface AvatarFormData {
  avatar: FileList | null;
}

interface ExtendedSession {
  firebaseToken?: string;
}

const AvatarPicker: React.FC<AvatarPickerProps> = ({ profileId, avatar }) => {
  const { register, watch } = useForm<AvatarFormData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const file = watch('avatar');
  const { data: session } = useSession() as { data: ExtendedSession | null };

  useEffect(() => {
    const initializeFirebaseAuth = async () => {
      if (session?.firebaseToken) {
        const auth = getAuth();
        console.log(
          'Attempting to sign in with Firebase token:',
          session.firebaseToken
        );
        try {
          const userCredential = await signInWithCustomToken(
            auth,
            session.firebaseToken
          );
          console.log('Firebase auth successful:', userCredential.user.uid);
        } catch (error) {
          console.error('Error signing in with Firebase token:', error);
        }
      }
    };
    initializeFirebaseAuth();
  }, [session?.firebaseToken]);

  useEffect(() => {
    const handleUpload = async () => {
      if (file?.[0] && file instanceof FileList) {
        setIsLoading(true);
        try {
          const imagesRef = ref(storage, `users/${profileId}/avatar`);
          const upload = await uploadBytes(imagesRef, file[0]);
          const publicURL = await getDownloadURL(upload.ref);
          await postMethod({
            path: '/api/postAvatar',
            data: {
              profileId,
              publicURL,
            },
          });
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    handleUpload();
  }, [file?.[0], profileId]);

  const avatarURL = useMemo(() => {
    if (file?.[0]) {
      if (file instanceof FileList) {
        return URL.createObjectURL(file[0]);
      }
    }
    return undefined;
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
      bgImage={!isLoading ? `url(${avatarURL ?? avatar})` : undefined}
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      {!avatarURL && !avatar && <BiCamera size="1.375em" color="gray" />}
      {isLoading && <Spinner />}
      <input
        type="file"
        accept="image/*"
        hidden
        {...register('avatar')}
      />
    </Circle>
  );
};

export default AvatarPicker; 