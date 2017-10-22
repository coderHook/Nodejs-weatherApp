const request = require('request');

  var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
      var encAddress = encodeURIComponent(address);
      var userUrl = 'http://maps.google.es/maps/api/geocode/json?address='+ encAddress;

      request({
        url: userUrl,
        json: true
      }, (error, response, body) => {
        if (body.status === 'OK') {
          resolve({
            address: body.results[0].formatted_address,
            latitude: body.results[0].geometry.location.lat,
            longitude: body.results[0].geometry.location.lng
          });
        } else { reject("No Results for this address");}
      })
    })
  };

  geocodeAddress('28018').then((location) => {
    //With loction we expect the longitud and latiutde
    console.log(JSON.stringify(location, undefined, 2));
  }, (errorMessage) => {
    console.log("There is an error in the location")
  });
