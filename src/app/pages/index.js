const GeolocationCard = require('../ui/geolocation_card')
const WatchingList = require('../ui/watching_list')
const applySearching = require('../ui/search')

$(document).ready(function() {
  if ($("meta[name=page]").attr("content") != "index") {
    return 
  }

  let watching_list = new WatchingList()
  watching_list.render($('#watching_list'))
  
  if (navigator.geolocation) {
    // geolocation card loading when browser support
    GeolocationCard.render($("#geolocation-card"))
  }
  
  applySearching($("#searching"))
})

