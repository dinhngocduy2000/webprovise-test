import Paper from "@mui/material/Paper";
import "./weather-details.scss";
import { URL_ENUMS } from "../../../../libraries/Enum/url-enum";
import { handleConvertAirQuality } from "../../../../libraries/Utils/convertAirQuality";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../weather-widget-context";
import moment from "moment";
import { handleConvertToKPH } from "../../../../libraries/Utils/convertToKPH";
import { convertDegreeToDirection } from "../../../../libraries/Utils/convertDegreeToDirection";
import LoadingHandlerWrapperComponent from "../../../../libraries/Components/LoadingHandlerWrapper/loading-handler-wraper-component";
import DailyForecastComponent from "./daily-forecast-item/daily-forecast-item";
import { WeatherDetailPropTypes } from "./weather-details-prop-types";
import { handleCheckIfSameDay } from "../../../../libraries/Utils/checkIfSameDay";
import ErrorComponent from "../../../../libraries/Components/ErrorComponent/error-component";

const WeatherDetailsComponent = (props: WeatherDetailPropTypes) => {
  const {
    selectedForecast,
    currentLocation,
    airQuality,
    units,
    setUnits,
    forecastLoading,
    airQualityLoading,
    listDailyForecast,
    currentForecast,
    error,
    locationText,
  } = useWeatherWidgetContext(WeatherWidgetContext);

  const handleSwitchUnits = (units: "metric" | "imperial") => {
    setUnits(units);
  };

  const renderForecastTime = (): string => {
    return handleCheckIfSameDay(
      currentForecast?.dt || 0,
      selectedForecast?.dt || 0
    )
      ? moment.unix(selectedForecast?.dt || 0).format("dddd hA")
      : moment.unix(selectedForecast?.dt || 0).format("dddd");
  };

  return (
    <Paper className="weather-details-ctn">
      {(error || !currentLocation) && !forecastLoading ? (
        <ErrorComponent
          message={
            locationText === undefined || locationText === ""
              ? "Please provide a location!"
              : "We could not find weather information for the location above"
          }
        />
      ) : (
        <>
          <div className="weather-detail-information">
            <LoadingHandlerWrapperComponent
              loading={forecastLoading}
              variant={"text"}
              height="40px"
              width={"50%"}
            >
              <p className="city-country">
                {currentLocation?.name + ", " + currentLocation?.country}
              </p>
            </LoadingHandlerWrapperComponent>
            <LoadingHandlerWrapperComponent
              loading={forecastLoading}
              variant={"text"}
              width="30%"
            >
              <p className="time-overall-weather">
                {renderForecastTime()} <span>•</span>{" "}
                <span>{selectedForecast?.weather[0].description}</span>
              </p>
            </LoadingHandlerWrapperComponent>
            <div className="weather-temp-wind">
              <LoadingHandlerWrapperComponent
                variant="rectangular"
                loading={forecastLoading}
                height="100px"
                width="50%"
              >
                <div className="weather-temperature">
                  <img
                    src={
                      URL_ENUMS.ICON_URL +
                      selectedForecast?.weather[0].icon +
                      ".png"
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
              </LoadingHandlerWrapperComponent>
              <div className="wind-humid-air">
                <LoadingHandlerWrapperComponent
                  loading={forecastLoading}
                  variant="text"
                  height="30px"
                  width="100px"
                >
                  <p>Humidity: {selectedForecast?.humidity}% </p>
                </LoadingHandlerWrapperComponent>
                <LoadingHandlerWrapperComponent
                  loading={forecastLoading}
                  variant="text"
                  height="30px"
                  width="100px"
                >
                  <p>
                    Wind:{" "}
                    {(units === "metric"
                      ? handleConvertToKPH(selectedForecast?.wind_speed || 0) +
                        " KPH "
                      : Math.trunc(selectedForecast?.wind_speed || 0) +
                        " MPH ") +
                      convertDegreeToDirection(selectedForecast?.wind_deg || 0)}
                  </p>
                </LoadingHandlerWrapperComponent>
                {handleCheckIfSameDay(
                  currentForecast?.dt || 0,
                  selectedForecast?.dt || 0
                ) && (
                  <LoadingHandlerWrapperComponent
                    loading={airQualityLoading}
                    variant="text"
                    height="30px"
                    width="100px"
                  >
                    <p>
                      Air Quality:{" "}
                      {handleConvertAirQuality(airQuality?.main.aqi || 1)}
                    </p>
                  </LoadingHandlerWrapperComponent>
                )}
              </div>
            </div>
          </div>
          <div className="daily-forecast-list">
            {listDailyForecast.map((forecast) => (
              <LoadingHandlerWrapperComponent
                loading={forecastLoading}
                variant="rectangular"
                width="70px"
                height="100px"
                key={forecast.dt}
              >
                <DailyForecastComponent forecast={forecast} />
              </LoadingHandlerWrapperComponent>
            ))}
          </div>
        </>
      )}
    </Paper>
  );
};

export default WeatherDetailsComponent;
