const request = require('request');


exports.geocodeAddress = function(address, callback){
  var encAddress = encodeURIComponent(address);
  var userUrl = 'http://maps.google.es/maps/api/geocode/json?address='+ encAddress;

  request({
    url: userUrl,
    json: true
  }, (error, response, body) => {
    if(error) {
      callback('Unable to connect to Gmaps')
    } else if (body.status === 'ZERO_RESULTS'){
      callback('Unable to find that address');
    } else if (body.status === 'OK') {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      })
    }
  });

}
