import { createAction, createAsyncAction } from 'typesafe-actions';
import { AxiosError } from 'axios';
import {
  ChangePasswordRequest,
  LogoutRequest,
  ResetPasswordRequest,
  UpdateRequest
} from '@internship/shared/types';


export const updateAsync = createAsyncAction('@Authentication/UPDATE_REQUEST', '@Authentication/UPDATE_SUCCESS', '@Authentication/UPDATE_FAILURE')<
  UpdateRequest,
  any,
  AxiosError
>();
export const logoutAsync = createAsyncAction('@Authentication/LOGOUT_REQUEST', '@Authentication/LOGOUT_SUCCESS', '@Authentication/LOGOUT_FAILURE')<
  LogoutRequest,
  any,
  AxiosError
>();

export const resetpasswordAsync = createAsyncAction(
  '@Authentication/RESETPASSWORD_REQUEST',
  '@Authentication/RESETPASSWORD_SUCCESS',
  '@Authentication/RESETPASSWORD_FAILURE'
)<ResetPasswordRequest, any, AxiosError>();

export const googleLogin = createAction('@Authentication/GOOGLE_LOGIN')();
export const updateLogout = createAction('@Authentication/UPDATE_LOGOUT')();

export const changePasswordAsync = createAsyncAction(
  '@Authentication/CHANGE_PASSWORD_REQUEST',
  '@Authentication/CHANGE_PASSWORD_SUCCESS',
  '@Authentication/CHANGE_PASSWORD_FAILURE'
)<ChangePasswordRequest, any, AxiosError>();
