const Weather = require('../modules/weather')

class WeatherCard {
  constrctor(dataLat, dataLon, dataCity) {
    // get data-lat, data-lon and data-city from element attributes
    this.dataLat = dataLat;
    this.dataLon = dataLon;
    this.datacity = dataCity;
  }

  renderCard(dataLat, dataLon, dataCity) {
    // use Weather load data to append info to this element
    let cardGeoForWeather = new Weather(dataLat, dataLon);
 
    cardGeoForWeather.request(function(data){
    $("[data-city=" + "'" + dataCity + "'" + "] " + "#current-temp").text(data.current.temp + "°");
    $("[data-city=" + "'" + dataCity + "'" + "] " + "#weather-desc").text(data.current.weather[0].description);
    $("[data-city=" + "'" + dataCity + "'" + "] " + "#temp-min").text("H: " + data.daily[0].temp.min + "°");
    $("[data-city=" + "'" + dataCity + "'" + "] " + "#temp-max").text("L: " + data.daily[0].temp.max + "°");
    })
  }
}

module.exports = WeatherCard

