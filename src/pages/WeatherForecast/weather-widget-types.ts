import { AirQualityReqType } from "../../libraries/Types/Air-quality-type";
import {
  CurrentWeather,
  DailyWeather,
} from "../../libraries/Types/Weather-forecast-types";

export type WeatherWidgetPropsType = {};
export type WeatherWidgetContextType = {
  currentLocation: string;
  listDailyForecast: DailyWeather[];
  currentForecast: CurrentWeather | undefined;
  selectedForecast: CurrentWeather | DailyWeather | undefined;
  handleFetchAirQuality: (data: AirQualityReqType) => Promise<void>;
  handleFetchLocation: (location: string) => Promise<void>;
  handleFetchWeatherForecast: (
    location: string,
    unit: "imperial" | "metric"
  ) => Promise<void>;
};
