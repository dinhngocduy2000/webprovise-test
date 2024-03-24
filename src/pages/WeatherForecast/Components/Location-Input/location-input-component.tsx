import "./location-input.scss";
import { BaseSyntheticEvent, useEffect } from "react";
import {
  WeatherWidgetContext,
  useWeatherWidgetContext,
} from "../../weather-widget-context";
import Paper from "@mui/material/Paper";
import Input from "antd/es/input/Input";
type Props = {};

const LocationInputComponent = (props: Props) => {
  const { handleFetchLocation, units, setLocationText, locationText } =
    useWeatherWidgetContext(WeatherWidgetContext);

  useEffect(() => {
    if (locationText !== undefined) {
      const timeOut = setTimeout(() => {
        //wait user to finish typing and then begin searching
        handleFetchLocation(locationText, units);
      }, 1000);
      return () => {
        clearTimeout(timeOut);
      };
    }
    //eslint-disable-next-line
  }, [locationText]);
  // if not add that line, this will give warning React Hook useEffect has missing dependencies: 'handleFetchLocation' and 'units'. Either include them or remove the dependency array

  return (
    <Paper className="location-input-ctn">
      <Input
        size="large"
        onChange={(e: BaseSyntheticEvent) => {
          setLocationText(e.target.value);
        }}
        allowClear
        placeholder="Enter a city"
      />
    </Paper>
  );
};

export default LocationInputComponent;
