import { ACCESS_TOKEN, USER_NAME } from '@internship/shared/types';

export const setAccessToken = (token: string) => window.localStorage.setItem(ACCESS_TOKEN, token);

export const getAccessToken = (): string => window.localStorage.getItem(ACCESS_TOKEN);

export const removeAccessToken = () => window.localStorage.removeItem(ACCESS_TOKEN);

export const setUserName = (token: string) => window.localStorage.setItem(USER_NAME, token);

export const getUserName = (): string => window.localStorage.getItem(USER_NAME);

export const removeUserName = () => window.localStorage.removeItem(USER_NAME);

export const getUrlParameter = (name, search) => {
  name = name.replace(/[\\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const loadMapApi = () => {
  const mapsURL = `https://maps.googleapis.com/maps/api/js?key=&libraries=places&language=TR&region=TR&v=quarterly`;
  const scripts = document.getElementsByTagName('script');
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src.indexOf(mapsURL) === 0) {
      return scripts[i];
    }
  }

  const googleMapScript = document.createElement('script');
  googleMapScript.src = mapsURL;
  googleMapScript.async = true;
  googleMapScript.defer = true;
  window.document.body.appendChild(googleMapScript);

  return googleMapScript;
};
