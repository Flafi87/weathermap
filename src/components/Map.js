import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import PropTypes from 'prop-types';
import Markers from './Markers';
import MyModal from './MyModal';

const Mapa = ({ weather, forecast }) => {
  const [showModal, setShowModal] = useState(false);
  const [chartData, setchartData] = useState([]);

  const chartCall = (data) => {
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
      <Map center={[50.3, 19.01]} zoom={6}>
        <TileLayer
          url="https://api.mapbox.com/styles/v1/flafi87/ckb0vl6pb156t1ilimhno1cpt/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZmxhZmk4NyIsImEiOiJjanpzYjlhYWEwcGJiM2NwbzQwd3FqaXkwIn0.5CeZemKLYgK4JI4AHSM3lA"
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
