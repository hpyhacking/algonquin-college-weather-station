const WeatherCard = require('../ui/weather_card')

$(document).ready(function() {
  if ($("meta[name=page]").attr("content") != "index") {
    return 
  }

  $("[data-city]").each(function(i, element){
    let card = new WeatherCard($(element).attr("data-lat"), $(element).attr("data-lon"), $(element).attr("data-city"));
    card.render($(element).attr("data-city"));
  });
});