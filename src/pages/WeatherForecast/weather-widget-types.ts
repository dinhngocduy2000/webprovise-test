import { AirQualityList } from "../../libraries/Types/Air-quality-type";
import { GeocodingResTypes } from "../../libraries/Types/Geocoding-types";
import {
  CurrentWeather,
  DailyWeather,
} from "../../libraries/Types/Weather-forecast-types";

export type WeatherWidgetPropsType = {};
export type WeatherWidgetContextType = {
  airQuality: AirQualityList | undefined;
  currentLocation: GeocodingResTypes | undefined;
  listDailyForecast: DailyWeather[];
  currentForecast: CurrentWeather | undefined;
  selectedForecast: CurrentWeather | DailyWeather | undefined;
  handleFetchAirQuality: (lat: number, lon: number) => Promise<void>;
  handleFetchLocation: (
    location: string,
    units: "metric" | "imperial"
  ) => Promise<void>;
  handleFetchForecast: (
    unit: "imperial" | "metric",
    lat: number,
    lon: number
  ) => Promise<void>;
};
