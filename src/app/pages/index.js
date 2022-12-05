const loadCurrentCard = require('../ui/current_card')

$(document).ready(function() {
  if ($("meta[name=page]").attr('content') != "index") {
    return 
  }

  loadCurrentCard()
})
