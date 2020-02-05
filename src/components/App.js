import React, { useState, useEffect } from 'react';
import { Button, Spinner } from 'reactstrap';
import Mapa from './Map';

const App = () => {
  const buttons = (
    <div className="d-flex justify-content-between">
      <Button className="my-3" color="success" href="https://flafi.hu/index.html#jscript">
        Back to the website
      </Button>
      <Button
        className="my-3"
        color="primary"
        href="https://github.com/Flafi87/weathermap"
        target="_blank"
      >
        Repo
      </Button>
    </div>
  );

  const spinner = (
    <div className="d-flex justify-content-center align-middle">
      <Spinner color="primary" />
    </div>
  );

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
      {isLoaded ? <Mapa weather={weather} forecast={forecast} isLoaded={isLoaded} /> : spinner}
    </div>
  );
};
export default App;
