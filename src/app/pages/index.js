const GeolocationCard = require('../ui/geolocation_card')
const WeatherCard = require('../ui/weather_card')
const applySearching = require('../ui/search')

$(document).ready(function() {
  if ($("meta[name=page]").attr("content") != "index") {
    return 
  }

  if (navigator.geolocation) {
    // geolocation card loading when browser support
    GeolocationCard.render($("#geolocation-card"))
  }
  
  applySearching($("#searching"))

  $("[data-city]").each(function(_, element){
    new WeatherCard(element).render()
  })
})

