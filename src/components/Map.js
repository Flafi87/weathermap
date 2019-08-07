import React from "react";
import { Map, TileLayer } from "react-leaflet";
import PropTypes from 'prop-types';
import Markers from "./Markers";
import MyModal from "./MyModal";

class Mapa extends React.Component {

  static propTypes = {
    isLoaded:PropTypes.bool.isRequired,
    weather:PropTypes.arrayOf(PropTypes.object).isRequired,
    forecast:PropTypes.arrayOf(PropTypes.object).isRequired
  }



  state = {
    showModal: false,
    chartData: []
  };

  chartCall = data => {
    this.setState({ chartData: data });
  };

  toggle = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal
    }));
  }


  render() {
    const {isLoaded, weather, forecast} = this.props
    const {showModal, chartData} = this.state
    if (isLoaded) {
      return (
        <div>
          <MyModal toggle={this.toggle} show={showModal} data={chartData} />
          <Map center={[50.3, 19.01]} zoom={8}>
            <TileLayer
              url="https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmxhZmk4NyIsImEiOiJjanBjemhmOHAwYW1lM2tvOGNvZmRseWV0In0.7Hq8AwC9BzLpfGzaDkGfzQ"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <Markers
              showModal={this.toggle}
              weather={weather}
              forecast={forecast}
              chartData={this.chartCall}
            />
          </Map>
        </div>
      );
    } 
      return (
        <div className="ui active dimmer">
          <div className="ui text loader">Loading</div>
        </div>
      );
    
  }
}

export default Mapa;