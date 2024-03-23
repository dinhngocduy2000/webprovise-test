import Paper from "@mui/material/Paper";
import "./weather-details.scss";
import { URL_ENUMS } from "../../../../libraries/Enum/url-enum";
import { useState } from "react";
import { handleConvertAirQuality } from "../../../../libraries/Utils/convertAirQuality";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../weather-widget-context";
import moment from "moment";
import { handleConvertToKPH } from "../../../../libraries/Utils/convertToKPH";
import { convertDegreeToDirection } from "../../../../libraries/Utils/convertDegreeToDirection";
type Props = {};

const WeatherDetailsComponent = (props: Props) => {
  const [units, setUnits] = useState<"metric" | "imperial">("metric");
  const { selectedForecast, currentLocation, handleFetchWeatherForecast } =
    useWeatherWidgetContext(WeatherWidgetContext);

  const handleSwitchUnits = (units: "metric" | "imperial") => {
    setUnits(units);
    handleFetchWeatherForecast(currentLocation.split(",")[0], units);
  };

  return (
    <Paper className="weather-details-ctn">
      <div className="weather-detail-information">
        <p className="city-country">{currentLocation}</p>
        <p className="time-overall-weather">
          {moment.unix(selectedForecast?.dt || 0).format("dddd hA")}{" "}
          <span>•</span> <span>{selectedForecast?.weather[0].description}</span>
        </p>
        <div className="weather-temp-wind">
          <div className="weather-temperature">
            <img
              src={
                URL_ENUMS.ICON_URL + selectedForecast?.weather[0].icon + ".png"
              }
              alt=""
            />
            <div className="temperature-number-ctn">
              <p className="temperature-number">
                {typeof selectedForecast?.temp === "number"
                  ? Math.trunc(selectedForecast?.temp)
                  : Math.trunc(selectedForecast?.temp?.max || 0)}
                °
              </p>
              <p className="farenheit-celcius">
                <span
                  onClick={() => handleSwitchUnits("imperial")}
                  className={units === "imperial" ? "active" : ""}
                >
                  F
                </span>
                <span>/</span>
                <span
                  onClick={() => handleSwitchUnits("metric")}
                  className={units === "metric" ? "active" : ""}
                >
                  C
                </span>
              </p>
            </div>
          </div>
          <div className="wind-humid-air">
            <p>Humidity: {selectedForecast?.humidity}% </p>
            <p>
              Wind:{" "}
              {units === "metric"
                ? handleConvertToKPH(selectedForecast?.wind_speed || 0) + "KPH"
                : Math.trunc(selectedForecast?.wind_speed || 0) +
                  " MPH " +
                  convertDegreeToDirection(selectedForecast?.wind_deg || 0)}
            </p>
            <p>Air Quality: {handleConvertAirQuality(2)}</p>
          </div>
        </div>
        <div className="daily-forecast-list"></div>
      </div>
    </Paper>
  );
};

export default WeatherDetailsComponent;
