const WeatherCard = require('../ui/weather_card')

$(document).ready(function() {
  if ($("meta[name=page]").attr("content") != "index") {
    return 
  }

  $("[data-city]").each(function(_, element){
    let card = new WeatherCard(element);
    card.render();
  });
});