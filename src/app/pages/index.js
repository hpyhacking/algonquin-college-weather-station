const WeatherCard = require('../ui/weather_card')

$(document).ready(function() {
  if ($("meta[name=page]").attr('content') != "index") {
    return 
  }

  // TODO: load all data-city elements, 
  let cityList = $("[data-city]");

  // and use each single one to init WeatherCard and render it.
  for (let city of cityList) {
    console.log(city.getAttribute("data-lat"));
    let card = new WeatherCard(city.getAttribute("data-lat"), city.getAttribute("data-lon"), city.getAttribute("data-city"));
    card.renderCard(city.getAttribute("data-lat"), city.getAttribute("data-lon"), city.getAttribute("data-city"));
  }
})
