import { createContext, useContext, useState } from "react";
import { fetchAirQualityCurrentDay } from "../../ApiHelper/AirQuality/air-quality-helper";
import { fetchUserLocation } from "../../ApiHelper/Geocoding/geocoding-helper";
import { fetchWeatherForecast } from "../../ApiHelper/WeatherForecast/weather-forecast";
import {
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
  const [currentLocation, setCurrentLocation] = useState<string>("");
  // ----------------------API FUNTIONS------------------------

  const handleFetchLocation = async (location: string) => {
    const data: GeocodingReqTypes = {
      q: location,
      limit: 5,
      appid: URL_ENUMS.API_KEY,
    };
    try {
      const res: GeocodingResTypes[] = await fetchUserLocation(data);
      console.log("CHECKING FETCHING USER LOCATION: ", res);
    } catch (error) {
      console.log("CHECKING FETCHING USER LOCATION ERROR: ", error);
    }
  };

  const handleFetchAirQuality = async (data: AirQualityReqType) => {
    try {
      const res: AirQualityResType = await fetchAirQualityCurrentDay(data);
      console.log("CHECK AIR QUALITY: ", res);
    } catch (error) {
      console.log("AIR QUALITY ERROR: ", error);
    }
  };

  const handleFetchWeatherForecast = async (
    location: string,
    unit: "imperial" | "metric"
  ) => {
    const data: GeocodingReqTypes = {
      q: location,
      limit: 5,
      appid: URL_ENUMS.API_KEY,
    };
    try {
      const locationRes: GeocodingResTypes[] = await fetchUserLocation(data);
      const weatherRes: WeatherForeCastResType = await fetchWeatherForecast({
        lat: locationRes[0].lat,
        lon: locationRes[0].lon,
        appid: URL_ENUMS.API_KEY,
        exclude: "minutely",
        units: unit,
      });
      setCurrentForecast(weatherRes.current);
      setSelectedForecast(weatherRes.current);
      setListDailyForecast(weatherRes.daily);
      setCurrentLocation(locationRes[0].name + ", " + locationRes[0].country);
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
        handleFetchWeatherForecast,
        listDailyForecast,
        currentForecast,
        selectedForecast,
        currentLocation,
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
