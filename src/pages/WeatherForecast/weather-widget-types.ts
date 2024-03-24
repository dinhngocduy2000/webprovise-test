import { AirQualityList } from "../../libraries/Types/Air-quality-type";
import { GeocodingResTypes } from "../../libraries/Types/Geocoding-types";
import {
  CurrentWeather,
  DailyWeather,
} from "../../libraries/Types/Weather-forecast-types";

export type WeatherWidgetPropsType = {};
export type WeatherWidgetContextType = {
  setLocationText: React.Dispatch<React.SetStateAction<string | undefined>>;
  locationText: string | undefined;
  airQuality: AirQualityList | undefined;
  currentLocation: GeocodingResTypes | undefined;
  listDailyForecast: DailyWeather[];
  selectedForecast: CurrentWeather | DailyWeather | undefined;
  units: "metric" | "imperial";
  airQualityLoading: boolean;
  forecastLoading: boolean;
  currentForecast: CurrentWeather | undefined;
  error: any;
  setSelectedForecast: React.Dispatch<
    React.SetStateAction<CurrentWeather | DailyWeather | undefined>
  >;
  setUnits: React.Dispatch<React.SetStateAction<"metric" | "imperial">>;
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
