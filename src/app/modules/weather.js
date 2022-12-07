const Config = require('../modules/config');
const ENDPOINT_WEATHER = "https://api.openweathermap.org/data/3.0/onecall";
const Cache = require('../modules/weather_cache');

class Weather {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
  }

  request(callback) {
    if (Cache.get(this.lat, this.lon)) {
      callback(Cache.get(this.lat, this.lon));
    } else {
      let lat = this.lat
      let lon = this.lon

      $.getJSON(`${ENDPOINT_WEATHER}?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${Config.API_KEY}`, 
        function(data){
          Cache.set(lat, lon, data);
          callback(data);
        })
    }
  }
}

module.exports = Weather;
