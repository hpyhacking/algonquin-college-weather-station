const Config = require('../modules/config')

const ENDPOINT_WEATHER = "https://api.openweathermap.org/data/3.0/onecall";

class Weather {
  constructor(lat, lon) {
    this.lat = lat;
    this.lon = lon;
    //this.text = 'Weather Station Example' + Config.API_KEY
  }

  request(callback) {
    if (localStorage.getItem(this.lat+ "," +this.lon)) {
      console.log("get in cache");
      console.log(localStorage.getItem(this.lat+ "," +this.lon));
      let data;
      return data = localStorage.getItem(this.lat+ "," +this.lon);
    } else {
      $.getJSON(`${ENDPOINT_WEATHER}?lat=${this.lat}&lon=${this.lon}&units=metric&appid=${Config.API_KEY}`,
      function(data){
        callback(data);
    })
    }
  }
  
}

module.exports = Weather;
