const Weather = require('../modules/weather')

$(document).ready(function() {
  if ($("meta[name=page]").attr('content') != "home") {
    return 
  }

  let weather = new Weather()
  $('h1').text("Hello World " + weather.text)
})
