import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import Markers from './Markers';
import MyModal from './MyModal';

const Mapa = ({ weather, forecast }) => {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setchartData] = useState([]);

  const chartCall = data => {
    setchartData(data);
  };

  const toggle = () => {
    setShowModal(showModal === false);
  };

  const MyMarkers = (
    <Markers showModal={toggle} weather={weather} forecast={forecast} chartData={chartCall} />
  );
  const MyMyModal = <MyModal toggle={toggle} show={showModal} data={chartData} />;
  return (
    <div className="mapcontainer">
      {MyMyModal}
      <Map center={[50.3, 19.01]} zoom={8}>
        <TileLayer
          url="https://api.tiles.mapbox.com/v4/mapbox.dark/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZmxhZmk4NyIsImEiOiJjanBjemhmOHAwYW1lM2tvOGNvZmRseWV0In0.7Hq8AwC9BzLpfGzaDkGfzQ"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {MyMarkers}
      </Map>
    </div>
  );
};

Mapa.propTypes = {
  weather: PropTypes.arrayOf(PropTypes.object).isRequired,
  forecast: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Mapa;
