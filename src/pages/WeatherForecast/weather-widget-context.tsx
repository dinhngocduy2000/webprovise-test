import { createContext, useContext, useState } from "react";
import { fetchAirQualityCurrentDay } from "../../ApiHelper/AirQuality/air-quality-helper";
import { fetchUserLocation } from "../../ApiHelper/Geocoding/geocoding-helper";
import { fetchWeatherForecast } from "../../ApiHelper/WeatherForecast/weather-forecast";
import {
  AirQualityList,
  AirQualityReqType,
  AirQualityResType,
} from "../../libraries/Types/Air-quality-type";
import {
  GeocodingReqTypes,
  GeocodingResTypes,
} from "../../libraries/Types/Geocoding-types";
import {
  CurrentWeather,
  DailyWeather,
  WeatherForeCastResType,
  WeatherForecastReqType,
} from "../../libraries/Types/Weather-forecast-types";
import { WeatherWidgetContextType } from "./weather-widget-types";
import { URL_ENUMS } from "../../libraries/Enum/url-enum";

type Props = {
  children: React.ReactNode;
};

export const WeatherWidgetContext =
  createContext<WeatherWidgetContextType | null>(null);

const WeatherWidgetContextProvider = ({ children }: Props) => {
  // ----------------------STATES------------------------
  const [selectedForecast, setSelectedForecast] = useState<
    CurrentWeather | DailyWeather
  >();
  const [currentForecast, setCurrentForecast] = useState<CurrentWeather>();
  const [listDailyForecast, setListDailyForecast] = useState<DailyWeather[]>(
    []
  );
  const [currentLocation, setCurrentLocation] = useState<GeocodingResTypes>();
  const [airQuality, setAirQuality] = useState<AirQualityList>();
  // ----------------------API FUNTIONS------------------------

  const handleFetchLocation = async (
    location: string,
    units: "metric" | "imperial"
  ) => {
    const data: GeocodingReqTypes = {
      q: location,
      limit: 5,
      appid: URL_ENUMS.API_KEY,
    };
    try {
      const locationRes: GeocodingResTypes[] = await fetchUserLocation(data);
      setCurrentLocation(locationRes[0]);
      handleFetchAirQuality(locationRes[0].lat, locationRes[0].lon);
      handleFetchForecast(units, locationRes[0].lat, locationRes[0].lon);
      console.log("CHECKING FETCHING USER LOCATION: ", locationRes);
    } catch (error) {
      console.log("CHECKING FETCHING USER LOCATION ERROR: ", error);
    }
  };

  const handleFetchAirQuality = async (lat: number, lon: number) => {
    const data: AirQualityReqType = {
      lat: lat,
      lon: lon,
      appid: URL_ENUMS.API_KEY,
    };
    try {
      const res: AirQualityResType = await fetchAirQualityCurrentDay(data);
      setAirQuality(res.list[0]);
      console.log("CHECK AIR QUALITY: ", res);
    } catch (error) {
      console.log("AIR QUALITY ERROR: ", error);
    }
  };

  const handleFetchForecast = async (
    unit: "imperial" | "metric",
    lat: number,
    lon: number
  ) => {
    const data: WeatherForecastReqType = {
      lat: lat,
      lon: lon,
      appid: URL_ENUMS.API_KEY,
      exclude: "minutely",
      units: unit,
    };
    try {
      const weatherRes: WeatherForeCastResType = await fetchWeatherForecast(
        data
      );
      setCurrentForecast(weatherRes.current);
      setSelectedForecast(weatherRes.current);
      setListDailyForecast(weatherRes.daily);
      console.log("CHECK WEATHER: ", weatherRes);
    } catch (error) {
      console.log("CHECK WEATHER ERROR: ", error);
    }
  };

  return (
    <WeatherWidgetContext.Provider
      value={{
        handleFetchAirQuality,
        handleFetchLocation,
        listDailyForecast,
        currentForecast,
        selectedForecast,
        currentLocation,
        handleFetchForecast,
        airQuality,
      }}
    >
      {children}
    </WeatherWidgetContext.Provider>
  );
};

export default WeatherWidgetContextProvider;
export const useWeatherWidgetContext = (
  customContext: React.Context<WeatherWidgetContextType | null>
) => {
  const context = useContext(customContext);
  if (!context) {
    throw new Error("Must be used within a Provider");
  }
  return context;
};
