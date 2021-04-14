export interface UserDetailResponse {
  Username: string;
  Name: string;
  LastName: string;
  Email: string;
  PhoneNumber: string;
  Age: string;
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
  Username: string;
  Name: string;
  LastName: string;
  Age: string;
  Image: string;
}

export interface Pageable {
  First: boolean;
  Last: boolean;
  Content: any;
}

