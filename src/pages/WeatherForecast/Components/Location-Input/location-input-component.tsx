import "./location-input.scss";
import { BaseSyntheticEvent } from "react";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../weather-widget-context";
import Paper from "@mui/material/Paper";
import Input from "antd/es/input/Input";
type Props = {};

const LocationInputComponent = (props: Props) => {
  const { handleFetchLocation, units, setLocationText } =
    useWeatherWidgetContext(WeatherWidgetContext);

  return (
    <Paper className="location-input-ctn">
      <Input
        size="large"
        onChange={(e: BaseSyntheticEvent) => {
          setLocationText(e.target.value);
          handleFetchLocation(e.target.value, units);
        }}
        allowClear
        placeholder="Enter a city"
      />
    </Paper>
  );
};

export default LocationInputComponent;
