require('./index.scss')

const Weather = require('./weather')

$( document ).ready(function() {
  let weather = new Weather()
  $('h1').text("Hello World " + weather.text)
})

