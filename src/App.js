import React, { useState, useEffect } from 'react';

import Map from './components/Map';
import buttons from './components/TopButtons';
import spinner from './components/Spinner';

const App = () => {
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = async () => {
    fetch('https://flafi.hu:2053/api/weather')
      .then(response => response.json())
      .then(weatherData => setWeather(weatherData))
      .then(() => {
        fetch('https://flafi.hu:2053/api/forecast')
          .then(response => response.json())
          .then(forecastData => {
            setForecast(forecastData);
            setIsLoaded(true);
          });
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      {buttons}
      {isLoaded ? <Map weather={weather} forecast={forecast} isLoaded={isLoaded} /> : spinner}
    </div>
  );
};
export default App;
