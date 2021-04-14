export interface UserDetailResponse {
  username: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
}
export interface CountriesResponse {
  country: string;
}

export interface SummaryResponse {
  global: any;
  countries: any;
  date: string;
}

export interface DayOneResponse {
  country: string;
  countryCode: string;
  province: string;
  city: string;
  cityCode: string;
  lat: string;
  lon: string;
  cases: string;
  status: string;
  date: string;
}
export interface UserInfoResponse {
  username: string;
  name: string;
  lastName: string;
  age: string;
  image: string;
}

export interface Pageable {
  first: boolean;
  last: boolean;
  content: any;
}

