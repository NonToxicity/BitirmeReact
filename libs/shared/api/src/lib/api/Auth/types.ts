export interface UserDetailResponse {
  username: string;
  name: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
}
export interface StatusResponse{
  ID:string,
  Country:string,
  Lat:string,
  Lon:string,
  Confirmed:string,
  Deaths:string,
  Recovered:string,
  Active:string,
  Date:string
}
/*export interface TravelDataResponse{

}*/
export interface TestsResponse{
  ID:string,
  Date:string,
  DailyChangeCumulativeTotal:string,
  CumulativeTotal:string,
  CumulativeTotalPerThousand:string,
  DailyChangeCumulativeTotalPerThousand:string,
  SevenDaySmoothedDailyChange:string,
  SevenDaySmoothDailyChangePerThousand:string

}
export interface CountriesResponse {
  Country: string;
}

export interface SummaryResponse {
  Global: any;
  Countries: any;
  Date: string;
}

export interface DayOneResponse {
  Country: string;
  CountryCode: string;
  province: string;
  City: string;
  CityCode: string;
  Lat: string;
  Lon: string;
  Cases: string;
  Status: string;
  Date: string;
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

