const applySearching = require('../ui/search')

$(document).ready(function() {
  if ($("meta[name=page]").attr('content') != "index") {
    return 
  }

  applySearching($("#searching"))
})
