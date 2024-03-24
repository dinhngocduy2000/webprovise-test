import Paper from "@mui/material/Paper";
import "./weather-details.scss";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../weather-widget-context";
import LoadingHandlerWrapperComponent from "../../../../libraries/Components/LoadingHandlerWrapper/loading-handler-wraper-component";
import DailyForecastComponent from "./daily-forecast-item/daily-forecast-item";
import { WeatherDetailPropTypes } from "./weather-details-prop-types";
import ErrorComponent from "../../../../libraries/Components/ErrorComponent/error-component";
import WeatherDetailInformation from "./weather-detail-information/weather-detail-information";

const WeatherDetailsComponent = (props: WeatherDetailPropTypes) => {
  const {
    currentLocation,
    forecastLoading,
    listDailyForecast,
    error,
    locationText,
  } = useWeatherWidgetContext(WeatherWidgetContext);

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
          <WeatherDetailInformation />
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
