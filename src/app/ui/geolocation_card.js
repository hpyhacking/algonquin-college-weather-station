const WeatherCard = require('../ui/weather_card')
const Geocoding = require('../modules/geocoding')

class GeolocationCard {
  static render(element) {
    let render_card = function(lat, lon, city) {
      $(element).data('city', city)
      $(element).data('lat', lat)
      $(element).data('lon', lon)

      let card = new WeatherCard($(element))
      card.render()
    }

    // check sessionStorage previous geolocation info
    let session_lat = window.sessionStorage.getItem("lat");
    let session_lon = window.sessionStorage.getItem("lon");
    let session_city = window.sessionStorage.getItem("city");

    if (session_lat && session_lon && session_city) {
      render_card(session_lat, session_lon, session_city)
      return
    }
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data) {
        let lat = data.coords.latitude.toFixed(2)
        let lon = data.coords.longitude.toFixed(2)

        window.sessionStorage.setItem('lat', lat)
        window.sessionStorage.setItem('lon', lon)

        let key = `city[${lat},${lon}]`

        let cached_city = window.localStorage.getItem(key)

        if (cached_city) {
          window.sessionStorage.setItem('city', cached_city)
          render_card(lat, lon, cached_city)
        } else {
          Geocoding.query(`${lat},${lon}`, function(data) {
            let result = data[0]

            if (result) {
              window.localStorage.setItem(key, result.city)
              window.sessionStorage.setItem('city', result.city)

              render_card(lat, lon, result.city)
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
