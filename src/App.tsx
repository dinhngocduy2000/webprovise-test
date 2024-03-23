import WeatherWidget from "./pages/WeatherForecast/weather-widget";
import WeatherWidgetContextProvider from "./pages/WeatherForecast/weather-widget-context";
import "./App.scss";
function App() {
  // useEffect(() => {
  //   handleFetchLocation({ q: "London", limit: 5, appid: URL_ENUMS.API_KEY });
  //   handleFetchForecast({
  //     lat: 21.0294,
  //     lon: 105.8544,
  //     appid: URL_ENUMS.API_KEY,
  //     exclude: "hourly,minutely",
  //     units: "metric",
  //   });
  //   handleFetchAirQuality({ lat: 50, lon: 50, appid: URL_ENUMS.API_KEY });
  // }, []);

  return (
    <div className="App">
      <WeatherWidgetContextProvider>
        <WeatherWidget />
      </WeatherWidgetContextProvider>
    </div>
  );
}

export default App;
