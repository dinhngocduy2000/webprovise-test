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
  const [units, setUnits] = useState<"metric" | "imperial">("metric"); //determine which measurement to use
  const [locationText, setLocationText] = useState<string>();
  const [selectedForecast, setSelectedForecast] = useState<
    CurrentWeather | DailyWeather
  >(); // the detailed forecast when user choose a forecast
  const [currentForecast, setCurrentForecast] = useState<CurrentWeather>();
  const [listDailyForecast, setListDailyForecast] = useState<DailyWeather[]>(
    []
  ); // list of forecast
  const [currentLocation, setCurrentLocation] = useState<GeocodingResTypes>(); // location fetched from api
  const [airQuality, setAirQuality] = useState<AirQualityList>(); // air quality
  const [forecastLoading, setForecastLoading] = useState<boolean>(false); // loading state when fetching forecasts
  const [airQualityLoading, setAirQualityLoading] = useState<boolean>(false); // loading state when fetching air quality
  const [error, setError] = useState<any>(); // typescript show error when trying to show error message with AxiosError type
  // ----------------------API FUNTIONS------------------------

  // Fetch location based on user input and immediately fetch forecasts and air quality
  const handleFetchLocation = async (
    location: string,
    units: "metric" | "imperial"
  ) => {
    setAirQualityLoading(true);
    setForecastLoading(true);
    const data: GeocodingReqTypes = {
      q: location,
      limit: 5,
      appid: URL_ENUMS.API_KEY,
    };
    try {
      const locationRes: GeocodingResTypes[] = await fetchUserLocation(data);
      setError(undefined);

      if (locationRes.length > 0) {
        setCurrentLocation(locationRes[0]);
        handleFetchAirQuality(locationRes[0]?.lat, locationRes[0]?.lon);
        handleFetchForecast(units, locationRes[0].lat, locationRes[0].lon);
      } else {
        setForecastLoading(false);
        setAirQualityLoading(false);
        listDailyForecast.length > 0 && setListDailyForecast([]);
        setCurrentLocation(undefined);
      }
      console.log("CHECKING FETCHING USER LOCATION: ", locationRes);
    } catch (error: any) {
      console.log("CHECKING FETCHING USER LOCATION ERROR: ", error);
      setError(error);
      setForecastLoading(false);
      setAirQualityLoading(false);
      setListDailyForecast([]);
    }
  };

  //fetch air quality
  const handleFetchAirQuality = async (lat: number, lon: number) => {
    setAirQualityLoading(true);

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
    } finally {
      setAirQualityLoading(false);
    }
  };

  //fetch forecast
  const handleFetchForecast = async (
    unit: "imperial" | "metric",
    lat: number,
    lon: number
  ) => {
    setForecastLoading(true);
    const data: WeatherForecastReqType = {
      lat: lat,
      lon: lon,
      appid: URL_ENUMS.API_KEY,
      exclude: "minutely,hourly",
      units: unit,
    };
    try {
      const weatherRes: WeatherForeCastResType = await fetchWeatherForecast(
        data
      );
      setSelectedForecast(weatherRes.current);
      setListDailyForecast(weatherRes.daily);
      setCurrentForecast(weatherRes.current);
      setError(undefined);
      console.log("CHECK WEATHER: ", weatherRes);
    } catch (error) {
      console.log("CHECK WEATHER ERROR: ", error);
      setListDailyForecast([]);
      setError(error);
    } finally {
      setForecastLoading(false);
    }
  };

  return (
    <WeatherWidgetContext.Provider
      value={{
        handleFetchAirQuality,
        handleFetchLocation,
        listDailyForecast,
        selectedForecast,
        currentLocation,
        handleFetchForecast,
        airQuality,
        units,
        setUnits,
        forecastLoading,
        airQualityLoading,
        setSelectedForecast,
        currentForecast,
        error,
        locationText,
        setLocationText,
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
