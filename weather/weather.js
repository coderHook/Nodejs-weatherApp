const request = require('request');

var getWeather = (lat, lon, callback) => {
  request({
    url: 'https://api.darksky.net/forecast/67ca3e3e155d8341d1614f5512a1cc6c/' + lat + ',' + lon,
    json: true,
  }, (err, res, body) => {
    if (err) { callback('Unable to connect to forecast.io server') }
    else if (res.statusCode === 400) { callback('Unable to feethc the weather ')}
    else if (res.statusCode === 200 ) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });

};

module.exports.getWeather = getWeather;
