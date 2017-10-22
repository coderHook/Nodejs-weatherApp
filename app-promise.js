const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Addres to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

var encAddress = encodeURIComponent(argv.address);
var geocodeUrl = 'http://maps.google.es/maps/api/geocode/json?address='+ encAddress;

axios.get(geocodeUrl).then((response) => {
  if(response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }

  var lat = response.data.results[0].geometry.location.lat;
  var lng = response.data.results[0].geometry.location.lng;

  var weatherURL = 'https://api.darksky.net/forecast/67ca3e3e155d8341d1614f5512a1cc6c/' + lat + ',' + lng;


  console.log('response.data ', response.data.results[0].formatted_address);

  return axios.get(weatherURL);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;

  console.log('The temperature is %s but it feels like %s', temperature, apparentTemperature);
}).catch((e) => {
  if (e.code === 'ENOTFOUND'){
    console.log('Unable to conect to api server');
  } else { console.log(e.message);}
});
