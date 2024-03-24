import WeatherWidget from "./pages/WeatherForecast/weather-widget";
import WeatherWidgetContextProvider from "./pages/WeatherForecast/weather-widget-context";
import "./App.scss";
function App() {
  return (
    <div className="App">
      <WeatherWidgetContextProvider>
        <WeatherWidget />
      </WeatherWidgetContextProvider>
    </div>
  );
}

export default App;
