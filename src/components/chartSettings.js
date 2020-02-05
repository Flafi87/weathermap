const chartSettings = {
  chart: {
    id: 'line-chart',
    width: '100%',
    height: '100%',
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
        customIcons: [],
      },
      autoSelected: 'zoom',
    },
  },
  xaxis: {
    type: 'datetime',
    tooltip: {
      enabled: false,
    },
  },
  yaxis: [
    {
      title: {
        text: 'Temperature',
      },
      labels: {
        formatter(value) {
          return `${value.toFixed(1)} C°`;
        },
      },
    },
    {
      opposite: true,
      title: {
        text: 'Rain',
      },
      labels: {
        formatter(value) {
          return `${value.toFixed(1)} mm`;
        },
      },
    },
  ],
  legend: {
    offsetY: -10,
  },
  responsive: [
    {
      breakpoint: 1000,
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        legend: {
          show: false,
        },
      },
    },
  ],
  tooltip: {
    enabled: false,
    shared: true,
    theme: 'light',
    onDatasetHover: {
      highlightDataSeries: false,
    },
    x: {
      show: true,
      format: 'dd MMM HH:mm',
      formatter: undefined,
    },
    marker: {
      show: true,
    },
  },

  stroke: {
    show: true,
    curve: 'smooth',
    lineCap: 'butt',
    colors: undefined,
    width: 2,
    dashArray: 0,
  },
};

export default chartSettings;
