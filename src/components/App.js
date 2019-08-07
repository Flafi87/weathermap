import React from "react";
import Axios from "axios";
import { Button } from 'reactstrap';
import Mapa from "./Map";

class App extends React.Component {
  state = {
    weather: [],
    forecast: [],
    isLoaded: false
  };

  componentDidMount() {
    Axios("https://flafi.me:2053/api/weather").then(
      weather => {
        this.setState({ weather: weather.data });
      },
      error => {
        console.log(error);
      }
    );
    Axios("https://flafi.me:2053/api/forecast").then(
      forecast => {
        this.setState({ forecast: forecast.data });
        this.setState({ isLoaded: true });
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
      const {weather, forecast, isLoaded} = this.state
    return (
      <div className="container">
        <div className="d-flex justify-content-between">
          <Button
            className="my-3"
            color="success"
            href="https://flafi.me/#jscript"
          >
      Back to the website
          </Button>
          <Button
            className="my-3"
            color="primary"
            href="https://github.com/Flafi87/weathermap"
          >
      Repo
          </Button>
        </div>
        
        <Mapa
          weather={weather}
          forecast={forecast}
          isLoaded={isLoaded}
        />
      </div>
    );
  }
}
export default App;
