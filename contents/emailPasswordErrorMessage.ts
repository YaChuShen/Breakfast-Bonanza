type ErrorMessage = {
  [key: string]: string;
};

export const emailMessage: ErrorMessage = {
  pattern: 'Please check email format',
  required: 'Please enter your email',
};

export const passwordMessage: ErrorMessage = {
  pattern:
    'Password should only contain letters and numbers, no special characters',
  required: 'Please set a password',
  minLength: 'Password must be at least 6 characters',
};
