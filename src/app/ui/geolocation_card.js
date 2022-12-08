const WeatherCard = require('../ui/weather_card')
const Geocoding = require('../modules/geocoding')

class GeolocationCard {
  static render(element) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data) {

        let lat = data.coords.latitude.toFixed(2)
        let lon = data.coords.longitude.toFixed(2)
        let key = `city[${lat},${lon}]`

        let render_card = function(city) {
          $(element).data('city', city)
          $(element).data('lat', lat)
          $(element).data('lon', lon)

          let card = new WeatherCard($(element))
          card.render()
        }

        let cached_city = window.localStorage.getItem(key)

        if (cached_city) {
          render_card(cached_city)
        } else {
          Geocoding.query(`${lat},${lon}`, function(data) {
            let result = data[0]

            if (result) {
              window.localStorage.setItem(key, result.city)
              render_card(result.city)
            }
          })
        }
      });
    } else { 
      $(element).find('.error').show()
    }
  }
}

module.exports = GeolocationCard
