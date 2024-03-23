import { useEffect } from "react";
import "./App.css";
import {
  GeocodingReqTypes,
  GeocodingResTypes,
} from "./libraries/Types/Geocoding-types";
import { fetchUserLocation } from "./ApiHelper/Geocoding/geocoding-helper";
import { URL_ENUMS } from "./libraries/Enum/url-enum";
import WeatherWidget from "./pages/weatherWidget/weather-widget";
import {
  WeatherForeCastResType,
  WeatherForecastReqType,
} from "./libraries/Types/Weather-forecast-types";
import { fetchWeatherForecast } from "./ApiHelper/WeatherForecast/weather-forecast";
import {
  AirQualityReqType,
  AirQualityResType,
} from "./libraries/Types/Air-quality-type";
import { fetchAirQualityCurrentDay } from "./ApiHelper/AirQuality/air-quality-helper";

function App() {
  const handleFetchLocation = async (params: GeocodingReqTypes) => {
    try {
      const res: GeocodingResTypes[] = await fetchUserLocation(params);
      console.log("CHECKING FETCHING USER LOCATION: ", res);
    } catch (error) {
      console.log("CHECKING FETCHING USER LOCATION ERROR: ", error);
    }
  };

  const handleFetchForecast = async (data: WeatherForecastReqType) => {
    try {
      const res: WeatherForeCastResType = await fetchWeatherForecast(data);
      console.log("CHECK LOCATION FORECAST: ", res);
    } catch (error) {
      console.log("CHECK LOCATION FORECAST ERROR: ", error);
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

  useEffect(() => {
    handleFetchLocation({ q: "London", limit: 5, appid: URL_ENUMS.API_KEY });
    handleFetchForecast({
      lat: 21.0294,
      lon: 105.8544,
      appid: URL_ENUMS.API_KEY,
      exclude: "hourly,minutely",
      units: "metric",
    });
    handleFetchAirQuality({ lat: 50, lon: 50, appid: URL_ENUMS.API_KEY });
  }, []);

  return (
    <div className="App">
      <WeatherWidget />
    </div>
  );
}

export default App;
