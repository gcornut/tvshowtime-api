const config = require('./configurable.js')
var Configurable

var request = require('request')

function Extractor (token) {
  Configurable = new config(token)
}

Extractor.prototype.request = function (options, callback) {
  request(Configurable.set(options), function (error, response, body) {
    var err = error || (!!body ? JSON.parse(body) : response.statusCode + " " + response.statusMessage)
    if (error || response.statusCode != 200) callback(err, null)
    else callback(null, JSON.parse(body))
  })
}

Extractor.prototype.post = function (options, callback) {
  request.post(Configurable.set(options), {form: options}, function (error, response, body) {
    var err = error || (!!body ? JSON.parse(body) : response.statusCode + " " + response.statusMessage)
    if (error || response.statusCode != 200) callback(err, null)
    else callback(null, JSON.parse(body))
  })
}
module.exports = Extractor
