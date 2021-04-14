import { AxiosResponse } from 'axios';
import { setAccessToken, setUserName } from '@internship/shared/utils';

export const loginInterceptor = (res: AxiosResponse) => {
  if (res.config.url.endsWith('/signin')) {
    const accessToken = res.data?.accessToken;
    const username = res.data?.username;
    if (res.status === 200) {
      if (accessToken) setAccessToken(accessToken);
      if (username) setUserName(username);
    }
  }

  return res;
};
