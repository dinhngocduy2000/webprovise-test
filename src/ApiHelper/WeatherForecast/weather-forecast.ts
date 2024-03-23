import { URL_ENUMS } from "../../libraries/Enum/url-enum";
import {
  WeatherForeCastResType,
  WeatherForecastReqType,
} from "../../libraries/Types/Weather-forecast-types";
import { fetch } from "../api-config";

export const fetchWeatherForecast = async (data: WeatherForecastReqType) => {
  const res: WeatherForeCastResType = await fetch(
    URL_ENUMS.WEATHER_FORECAST,
    data
  );
  console.log("CHECK WEATHER FORECAST: ", res);

  return res;
};
