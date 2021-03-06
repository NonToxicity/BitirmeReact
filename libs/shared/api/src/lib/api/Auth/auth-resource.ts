import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { UserDetailResponse, UserInfoResponse } from './types';
import {
  ChangePasswordRequest,
  LogoutRequest,
  ResetPasswordRequest,
} from '@internship/shared/types';

export class AuthResource {
  constructor(private axios: AxiosInstance = axiosStatic, private axiosRequestConfig: AxiosRequestConfig = {}) {
  }

  update = (data: any): Promise<any> => this.axios.put('user/edit', data, this.axiosRequestConfig).then((r) => r.data);
  logout = (data: LogoutRequest): Promise<any> => this.axios.post('user/logout', data, this.axiosRequestConfig).then((r) => r.data);
  resetPassword = (data: ResetPasswordRequest): Promise<any> =>
    this.axios.post('user/create-new-password', data, this.axiosRequestConfig).then((r) => r.data);
  userDetail = (): Promise<UserDetailResponse> => this.axios.get('user/', this.axiosRequestConfig).then((r) => r.data);
  changePassword = (data: ChangePasswordRequest): Promise<any> =>
    this.axios.post('user/change-password', data, this.axiosRequestConfig).then((r) => r.data);
}
