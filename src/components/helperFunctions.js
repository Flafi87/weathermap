const checker = x => {
  if (x.rain && x.rain['3h'] !== undefined) {
    return x.rain['3h'];
  }
  return 0;
};

export const temperatureArray = forecast => {
  const array = [];
  forecast.forEach(function(object) {
    array.push([object.dt * 1000, object.main.temp]);
  });
  return array;
};

export const rainArray = forecast => {
  const array = [];
  forecast.forEach(function(object) {
    array.push([object.dt * 1000, checker(object)]);
  });
  return array;
};
