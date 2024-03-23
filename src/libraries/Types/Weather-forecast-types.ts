export type WeatherForeCastResType = {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  daily: DailyWeather[];
};

export type CurrentWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type DailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  uvi: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: TempDetail;
  feels_like: TempDetail;
};

type TempDetail = {
  day?: number;
  min?: number;
  max?: number;
  night?: number;
  eve?: number;
  morn?: number;
};

export type WeatherForecastReqType = {
  lat: number;
  lon: number;
  appid: string;
  exclude: string;
  units: "metric" | "imperial";
};
