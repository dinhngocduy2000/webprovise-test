import moment from "moment";
import { URL_ENUMS } from "../../../../../libraries/Enum/url-enum";
import "./daily-forecast-item.scss";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../../weather-widget-context";
import { DailyForecastItemPropTypes } from "./daily-forecast-item-props-types";
import { handleCheckIfSameDay } from "../../../../../libraries/Utils/checkIfSameDay";

const DailyForecastComponent = ({ forecast }: DailyForecastItemPropTypes) => {
  const { setSelectedForecast, currentForecast, selectedForecast } =
    useWeatherWidgetContext(WeatherWidgetContext);
  return (
    <div
      className={
        "daily-forecast-item" +
        (selectedForecast?.dt === forecast.dt ||
        handleCheckIfSameDay(selectedForecast?.dt || 0, forecast.dt)
          ? " current"
          : "")
      }
      onClick={() =>
        setSelectedForecast(
          handleCheckIfSameDay(currentForecast?.dt || 0, forecast.dt)
            ? currentForecast
            : forecast
        )
      }
    >
      <p className="forecast-date">
        {moment.unix(forecast.dt).format("llll").split(",")[0]}
      </p>
      <img
        src={URL_ENUMS.ICON_URL + forecast.weather[0].icon + ".png"}
        alt=""
      />
      <p className="forecast-max-temperature">
        {Math.trunc(forecast.temp.max || 0)}°
      </p>
      <p className="forecast-min-temperature">
        {Math.trunc(forecast.temp.min || 0)}°
      </p>
    </div>
  );
};

export default DailyForecastComponent;
