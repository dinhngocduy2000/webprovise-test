import { createContext, useContext } from "react";
import { WeatherWidgetContextType } from "./weather-widget-types";

type Props = {
  children: React.ReactNode;
};

export const WeatherWidgetContext =
  createContext<WeatherWidgetContextType | null>(null);

const WeatherWidgetContextProvider = ({ children }: Props) => {
  return (
    <WeatherWidgetContext.Provider value={{}}>
      {children}
    </WeatherWidgetContext.Provider>
  );
};

export default WeatherWidgetContextProvider;
export const useWeatherWidgetContext = (
  customContext: React.Context<WeatherWidgetContextType | null>
) => {
  const context = useContext(customContext);
  if (!context) {
    throw new Error("Must be used within a Provider");
  }
  return context;
};
