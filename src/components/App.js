import React from 'react';
import Axios from 'axios';
import { Button, Spinner } from 'reactstrap';
import Mapa from './Map';

class App extends React.Component {
  buttons = (
    <div className="d-flex justify-content-between">
      <Button className="my-3" color="success" href="https://flafi.me/index.html#jscript">
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

  spinner = (
    <div className="d-flex justify-content-center align-middle">
      <Spinner color="primary" />
    </div>
  );

  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      forecast: [],
      isLoaded: false,
    };
  }

  componentDidMount() {
    Axios('https://flafi.me:2053/api/weather').then(
      weather => {
        this.setState({ weather: weather.data });
      },
      error => {
        console.log(error);
      },
    );
    Axios('https://flafi.me:2053/api/forecast').then(
      forecast => {
        this.setState({ forecast: forecast.data });
        this.setState({ isLoaded: true });
      },
      error => {
        console.log(error);
      },
    );
  }

  render() {
    const { weather, forecast, isLoaded } = this.state;
    return (
      <div className="container">
        {this.buttons}
        {isLoaded ? (
          <Mapa weather={weather} forecast={forecast} isLoaded={isLoaded} />
        ) : (
          this.spinner
        )}
      </div>
    );
  }
}
export default App;
