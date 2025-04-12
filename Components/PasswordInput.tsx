import { Input } from '@chakra-ui/react';
import React from 'react';
import { UseFormRegister, FieldValues } from 'react-hook-form';
type PasswordInputProps = {
  register: UseFormRegister<FieldValues>;
};

const PasswordInput = ({ register }: PasswordInputProps) => {
  return (
    <Input
      {...register('password', {
        required: true,
        minLength: 6,
        pattern: /^[a-z0-9\.]+$/,
      })}
      bg="white"
      placeholder="Min. 6 characters including numbers and letters"
      type="password"
    ></Input>
  );
};

export default PasswordInput;
