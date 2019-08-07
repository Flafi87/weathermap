import React, { Component } from "react";
import Chart from "react-apexcharts";
import PropTypes from 'prop-types';

class TempChart extends Component {

  static propTypes = {
    forecast:PropTypes.arrayOf(PropTypes.object).isRequired
  } 

  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "line-chart",
          width: "100%",
          height: "100%",
          toolbar: {
            show: false,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              // eslint-disable-next-line no-bitwise
              reset: false | '<img src="/static/icons/reset.png" width="20">',
              customIcons: []
            },
            autoSelected: "zoom"
          }
        },
        xaxis: {
          type: "datetime",
          tooltip: {
            enabled: false
          }
        },
        yaxis: [
          {
            title: {
              text: "Temperature"
            },
            labels: {
              formatter(value) {
                return `${value.toFixed(1)  } C°`;
              }
            }
          },
          {
            opposite: true,
            title: {
              text: "Rain"
            },
            labels: {
              formatter(value) {
                return `${value.toFixed(1)  } mm`;
              }
            }
          }
        ],
        legend: {
          offsetY: -10
        },
        responsive: [
          {
            breakpoint: 1000,
            options: {
              plotOptions: {
                bar: {
                  horizontal: false
                }
              },
              legend: {
                position: "bottom"
              }
            }
          }
        ],
        tooltip: {
          enabled: false,
          shared: true,
          theme: "light",
          onDatasetHover: {
            highlightDataSeries: false
          },
          x: {
            show: true,
            format: "dd MMM HH:mm",
            formatter: undefined
          },
          marker: {
            show: true
          }
        },

        stroke: {
          show: true,
          curve: "smooth",
          lineCap: "butt",
          colors: undefined,
          width: 2,
          dashArray: 0
        }
      }
    };
  }

  render() {
    const {forecast} = this.props
    const {options} = this.state
    if (!forecast) {
      return <div>Loading...</div>;
    }
    const forecastTemp = [];
    const forecastRain = [];
    function checker(x) {
      if (x.rain && x.rain["3h"] !== undefined) {
        return x.rain["3h"];
      } 
        return 0;
      
    }
    forecast.forEach(function(object) {
      forecastTemp.push([object.dt * 1000, object.main.temp]);
      forecastRain.push([object.dt * 1000, checker(object)]);
    });
    return (
      <div className="mixed-chart">
        <Chart
          options={options}
          series={[
            { name: "Temperature", type: "line", data: forecastTemp },
            { name: "Rain", type: "bar", data: forecastRain }
          ]}
        />
      </div>
    );
  }
}

export default TempChart;
