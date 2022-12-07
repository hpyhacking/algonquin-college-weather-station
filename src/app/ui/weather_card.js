const Weather = require('../modules/weather')

class WeatherCard {
  constructor(lat, lon, city) {
    this.lat = lat;
    this.lon = lon;
    this.city = city;
  }

  render(city) {
    let cardGeoForWeather = new Weather(this.lat, this.lon);

    cardGeoForWeather.request(function(data){
    $("[data-city=" + "'" + city + "'" + "] " + "#current-temp").text(data.current.temp + "°");
    $("[data-city=" + "'" + city + "'" + "] " + "#weather-desc").text(data.current.weather[0].description);
    $("[data-city=" + "'" + city + "'" + "] " + "#temp-min").text("H: " + data.daily[0].temp.min + "°");
    $("[data-city=" + "'" + city + "'" + "] " + "#temp-max").text("L: " + data.daily[0].temp.max + "°");
    })
  }
}

module.exports = WeatherCard

