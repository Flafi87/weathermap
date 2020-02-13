import React from 'react';
import Chart from 'react-apexcharts';
import PropTypes from 'prop-types';
import chartSettings from './chartSettings';
import { temperatureArray, rainArray } from './helperFunctions';

const TempChart = ({ forecast }) => {
  const forecastTemp = temperatureArray(forecast);
  const forecastRain = rainArray(forecast);

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
