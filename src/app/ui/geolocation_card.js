const Weather = require('../modules/weather')

class GeolocationCard {
  static render(element) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(data) {
        let lat = position.coords.latitude
        let lon = position.coords.longitude
        
        // use Weather load data to append info to this element
      });
    } else { 
      $(element).find('.error').show()
    }
  }
}

module.exports = GeolocationCard
