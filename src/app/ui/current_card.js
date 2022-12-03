const Weather = require('../modules/weather')

function loadCurrentCard() {
  let weather = new Weather("Current Weather Station")

  let longitude = 0
  let latitude = 0

  weather.request(longitude, latitude, function(data) {
    $('h1').text("Hello World " + data.text)
  })
}

module.exports = loadCurrentCard
