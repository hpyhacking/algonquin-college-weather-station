const Config = require('../modules/config')

class Weather {
  constructor() {
    this.text = 'Weather Station'
  }

  request(lon, lat, callback) {
    let data = {text: this.text}
    callback(data)
  }
}

module.exports = Weather;
