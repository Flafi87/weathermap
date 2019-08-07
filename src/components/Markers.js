import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { Card, Button } from 'reactstrap';
import PropTypes from 'prop-types';

class Markers extends React.Component {

  static propTypes = {
    weather:PropTypes.arrayOf(PropTypes.object).isRequired,
    showModal:PropTypes.func.isRequired,
    chartData:PropTypes.func.isRequired,
    forecast:PropTypes.arrayOf(PropTypes.object).isRequired
  }

  constructor(props) {
    super(props);
    this.state = { myMarker: [] };
  }

  componentDidMount() {
    const {weather, showModal, chartData, forecast} = this.props
    const myMarker = weather.map((marker, index) => {
      const temp = marker.main.temp.toFixed(1);
      const date = new Date(marker.dt * 1000);
      const hour = (`0${  date.getHours()}`).slice(-2);
      const minutes = (`0${  date.getMinutes()}`).slice(-2);
      const position = [marker.coord.lat, marker.coord.lon];

      const myIcon = L.divIcon({
        html: `<div><span class="temp">${temp}&#176C</span><div class="owf owf-${
          marker.weather[0].id
        } owf-3x"></div></div>`,
        iconSize: [0, 0],
        iconAnchor: [20, 20]
      });
      const popup = (
        <Popup>
          <Card className="p-3">
            <h2>{marker.name}</h2>
            <Button
              color="primary"
              type="button"
              onClick={() => {
              chartData(forecast[index].list);
              showModal();
            }}
            >
            Forecast chart
            </Button>
            <h4>
            Temperature: 
              {' '}
              {temp}
°C
            </h4>
            <h4>
Humidity: 
              {' '}
              {marker.main.humidity}
%
            </h4>
            <h4>
            Updated at : 
              {' '}
              {hour}
:
              {minutes}
            </h4>
          </Card>

        </Popup>
      );
      return (
        // eslint-disable-next-line no-underscore-dangle
        <Marker key={marker._id} position={position} icon={myIcon}>
          {popup}
        </Marker>
      );
    });
    this.setState({ myMarker });
  }

  render() {
    const {myMarker} = this.state
    return <div>{myMarker}</div>;
  }
}

export default Markers;
