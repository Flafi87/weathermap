import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import chartSettings from './chartSettings';

const TempChart = ({ forecast }) => {
  const forecastTemp = [];
  const forecastRain = [];
  const checker = x => {
    if (x.rain && x.rain['3h'] !== undefined) {
      return x.rain['3h'];
    }
    return 0;
  };
  if (!forecast) {
    return <div>Loading...</div>;
  }
  forecast.forEach(function(object) {
    forecastTemp.push([object.dt * 1000, object.main.temp]);
    forecastRain.push([object.dt * 1000, checker(object)]);
  });
  return (
    <div className="mixed-chart">
      <Chart
        options={chartSettings}
        series={[
          { name: 'Temperature', type: 'line', data: forecastTemp },
          { name: 'Rain', type: 'bar', data: forecastRain },
        ]}
      />
    </div>
  );
};

TempChart.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TempChart;
