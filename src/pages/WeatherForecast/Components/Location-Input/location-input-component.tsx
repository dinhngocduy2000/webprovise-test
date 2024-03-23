import "./location-input.scss";
import { BaseSyntheticEvent, useState } from "react";
import Search from "antd/es/input/Search";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../weather-widget-context";
import Paper from "@mui/material/Paper";
type Props = {};

const LocationInputComponent = (props: Props) => {
  const [locationText, setLocationText] = useState<string>("");
  const { handleFetchWeatherForecast } =
    useWeatherWidgetContext(WeatherWidgetContext);

  return (
    <Paper className="location-input-ctn">
      <Search
        size="large"
        onChange={(e: BaseSyntheticEvent) => {
          setLocationText(e.target.value);
        }}
        onSearch={() => handleFetchWeatherForecast(locationText, "metric")}
        allowClear
        placeholder="Enter a city"
      />
    </Paper>
  );
};

export default LocationInputComponent;
