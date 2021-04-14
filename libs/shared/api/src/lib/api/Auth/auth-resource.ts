import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  CountriesResponse,
  DayOneResponse, StatusResponse,
  SummaryResponse, TestsResponse, TravelDataResponse,
  UserDetailResponse,
  UserInfoResponse
} from './types';
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
  changePassword = (data: ChangePasswordRequest): Promise<any> =>
    this.axios.post('user/change-password', data, this.axiosRequestConfig).then((r) => r.data);
  userDetail = (): Promise<UserDetailResponse> => this.axios.get('user/', this.axiosRequestConfig).then((r) => r.data);
  dayone = (country: string): Promise<DayOneResponse> =>
    this.axios
      .get('dayone', {
        params: {
          country: country
        }
      })
      .then((r) => r.data);
  countries = (): Promise<CountriesResponse> => this.axios.get('countries', this.axiosRequestConfig).then((r) => r.data);
  summary = (): Promise<SummaryResponse> => this.axios.get('summary', this.axiosRequestConfig).then((r) => r.data);
  status = (country: string): Promise<StatusResponse> =>
    this.axios
      .get('statusbycountry', {
        params: {
          country: country
        }
      })
      .then((r) => r.data);
  travelData = (country: string): Promise<TravelDataResponse> =>
    this.axios
      .get('traveldatabycountry', {
        params: {
          country: country
        }
      })
      .then((r) => r.data);
  tests = (country: string): Promise<TestsResponse> =>
    this.axios
      .get('testsbycountry', {
        params: {
          country: country
        }
      })
      .then((r) => r.data);
  whatIf = (country: string): Promise<DayOneResponse> =>
    this.axios
      .get('whatifbycountry', {
        params: {
          country: country
        }
      })
      .then((r) => r.data);
}
