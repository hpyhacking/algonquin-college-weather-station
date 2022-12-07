const Weather = require('../modules/weather')

class WeatherCard {
  constructor(element) {
    this.lat = $(element).attr("data-lat");
    this.lon = $(element).attr("data-lon");
    this.city = $(element).attr("data-city");
  }

  
  render() {
    let weather = new Weather(this.lat, this.lon);
    let city = this.city;

    weather.request(function(data){
    $("[data-city=" + "'" + city + "'" + "]").find("#current-temp").text(data.current.temp + "°");
    $("[data-city=" + "'" + city + "'" + "]").find(".weather-desc").text(data.current.weather[0].description);
    $("[data-city=" + "'" + city + "'" + "]").find(".temp-min").text("H: " + data.daily[0].temp.min + "°");
    $("[data-city=" + "'" + city + "'" + "]").find(".temp-max").text("L: " + data.daily[0].temp.max + "°");
    })
  }
}

module.exports = WeatherCard

