const Config = require('../modules/config');
const Weather = require('../modules/weather')
const Geocoding = require('../modules/geocoding')
const ENDPOINT_LOCATION = "http://api.openweathermap.org/geo/1.0/reverse"

const CARD_TEMPLATE = `
<h3>#city#</h3>
<p>#temp#</p>
<p>#description#</p>
<p><span>L:</span> #min#</p>
<p><span>H:</span> #max#</p>
`

class GeolocationCard {
  static render(element) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data) {
        let lat = data.coords.latitude
        let lon = data.coords.longitude

        let locationWeather = new Weather(lat, lon)
        locationWeather.request(function(data){
          let card = CARD_TEMPLATE.replace('#temp#', data.current.temp)
                                .replace('#description#', data.current.weather[0].description)
                                .replace('#min#', data.daily[0].temp.min)
                                .replace('#max#', data.daily[0].temp.max)
                                
          $.getJSON(`${ENDPOINT_LOCATION}?lat=${lat.toFixed(4)}&lon=${lon.toFixed(4)}&limit=1&appid=${Config.API_KEY}`, 
            function(data){
            card = card.replace('#city#', data[0].name)
            console.log(card);
            $(element).empty().append($(card))
          })
        })
      });
    } else { 
      $(element).find('.error').show()
    }
  }
}

module.exports = GeolocationCard
