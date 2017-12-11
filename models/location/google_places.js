exports.convertToLatLng = function(address, cb) {
  const request = require('request');
  var jsonData;

  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.GOOGLE_PLACES_KEY}`
  request ({
    url: url,
    json: true
  }, (err, res, body) => {
    if (!err && res.statusCode === 200) {
      let location = body.results[0].geometry.location
      cb(location)
    }
  })
}