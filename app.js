const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.a, (errorMessage, results)=>{
  if(errorMessage){
    console.log(errorMessage);
  } else {
    console.log(results.address);
    //lat lon, callback
    weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
      if(errorMessage){
        console.log(errorMessage);
      } else {
        console.log(JSON.stringify(weatherResults, undefined, 2));
        console.log('The temperature is %s but it feels like %s', weatherResults.temperature, weatherResults.apparentTemperature)
      }
    });
  }
});
