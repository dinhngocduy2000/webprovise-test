import moment from "moment";
import LoadingHandlerWrapperComponent from "../../../../../libraries/Components/LoadingHandlerWrapper/loading-handler-wraper-component";
import { URL_ENUMS } from "../../../../../libraries/Enum/url-enum";
import { handleCheckIfSameDay } from "../../../../../libraries/Utils/checkIfSameDay";
import { handleConvertAirQuality } from "../../../../../libraries/Utils/convertAirQuality";
import { convertDegreeToDirection } from "../../../../../libraries/Utils/convertDegreeToDirection";
import { handleConvertToKPH } from "../../../../../libraries/Utils/convertToKPH";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../../weather-widget-context";

type Props = {};

const WeatherDetailInformation = (props: Props) => {
  const {
    selectedForecast,
    currentLocation,
    airQuality,
    units,
    forecastLoading,
    airQualityLoading,
    setUnits,
    handleFetchForecast,
    currentForecast,
  } = useWeatherWidgetContext(WeatherWidgetContext);

  const handleSwitchUnits = (units: "metric" | "imperial") => {
    setUnits(units);
    handleFetchForecast(
      units,
      currentLocation?.lat || 0,
      currentLocation?.lon || 0
    );
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
                : Math.trunc(selectedForecast?.wind_speed || 0) + " MPH ") +
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
  );
};

export default WeatherDetailInformation;
