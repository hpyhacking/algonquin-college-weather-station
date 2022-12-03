class Weather {
  constructor() {
    this.text = 'Weather Station Example'
  }

  request(lon, lat, callback) {
    let data = {text: this.text}
    callback(data)
  }
}

module.exports = Weather;
