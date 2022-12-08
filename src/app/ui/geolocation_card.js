const WeatherCard = require('../ui/weather_card')
const Geocoding = require('../modules/geocoding')

class GeolocationCard {
  static render(element) {
    //return 
    let render_card = function(lat, lon, city) {
      $(element).data('city', city)
      $(element).data('lat', lat)
      $(element).data('lon', lon)

      let card = new WeatherCard($(element))
      card.render()
    }

    let current_position_callback = function(data) {
      let lat = data.coords.latitude.toFixed(2)
      let lon = data.coords.longitude.toFixed(2)
      let key = `city[${lat},${lon}]`

      let cached_city = window.localStorage.getItem(key)

      if (cached_city) {
        window.sessionStorage.setItem('city', cached_city)
        render_card(lat, lon, cached_city)
        return
      }

      Geocoding.query(`${lat},${lon}`, function(data) {
        let result = data[0]

        if (result) {
          // cache city in localStorage for longtime cached city name
          window.localStorage.setItem(key, result.city)
          render_card(lat, lon, result.city)
        }
      })
    }

    let error_callback = function(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);

      let info = `<p>User has denied the request for sharing location.
                     Please enable location sharing in web browser.</p>`
      $(element).empty().append($(info))
    }

    let options = {
      timeout: 5000, 
      // cached geolocation data 30 mins
      maximumAge: 1000 * 60 * 15 
    }

    navigator.geolocation.getCurrentPosition(current_position_callback, error_callback, options)
  }
}

module.exports = GeolocationCard
