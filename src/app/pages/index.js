const loadCurrentCard = require('../ui/current_card')
const geoLocationCard = require('../ui/geolocation_card')

$(document).ready(function() {
  if ($("meta[name=page]").attr('content') != "index") {
    return 
  }

  geoLocationCard.render($("#geoLocationCard"))
})
