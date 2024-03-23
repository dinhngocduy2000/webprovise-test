import Paper from "@mui/material/Paper";
import LocationInputComponent from "./Components/Location-Input/location-input-component";
import { WeatherWidgetPropsType } from "./weather-widget-types";
import "./weather-widget.scss";
import WeatherDetailsComponent from "./Components/WeatherDetails/weather-details";
const WeatherWidget = (props: WeatherWidgetPropsType) => {
  return (
    <Paper className="weather-widget-ctn">
      <LocationInputComponent />
      <WeatherDetailsComponent />
    </Paper>
  );
};

export default WeatherWidget;
