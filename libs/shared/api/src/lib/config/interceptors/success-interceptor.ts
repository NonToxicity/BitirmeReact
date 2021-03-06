import { AxiosResponse } from 'axios';

const success = {

  'user/change-password': {
    '200': 'Password is successfully changed'
  },
  'user/create-new-password': {
    '200': 'The password was changed'
  },
  'user/edit': {
    '200': 'User update success.'
  },
};
export const successInterceptor = (res: AxiosResponse) => {
  let successMessage = null;
  if (
    res?.config.url.endsWith('/change-password') ||
    res?.config.url.endsWith('/create-new-password') ||
    res?.config.url.endsWith('/edit')
  ) {
    successMessage = success[res.config.url][res?.status];
  }
  window['UGLY_STORE'].dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: successMessage });
  return res;
};
