import { AxiosError } from 'axios';

const err = {
    'user/change-password': {
    '108': 'Old password is incorrect',
    '109': 'Password fields does not match',
  },
  'user/edit': {
    '400': 'Email is already in use!',
    '500': 'Phone Number Error',
  },

  'user/create-new-password': {
    '400': 'Something is wrong with that token!'
  },
};
export const errorInterceptor = (error: AxiosError) => {
  let errorMessage = null;
  if (error.response?.data.message.toString() === '108') {
    errorMessage = err[error.config.url]['108'];
  } else if (error.response?.data.message.toString() === '109') {
    errorMessage = err[error.config.url]['109'];
  }

  window['UGLY_STORE'].dispatch({ type: '@temp/ERROR_REQUIRED', payload: errorMessage });
  throw error;
};
