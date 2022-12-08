const Weather = require('../modules/weather')

const CARD_TEMPLATE = `
<div class='left'>
  <h6>#geolocation# #city#</h6>
  <p><i class='fa-solid #icon#'></i> #name#</p>
  <p><span>L:</span> #min#&#x2103; <span>H:</span> #max#&#x2103;</p>
</div>
<div class='right'>
  <span>#temp#&#x2103;</span>
</div>
<i class='fa-solid #icon#'></i>

`

const CONDITIONS = {
  0: {icon: '', name: ''},
  2: {icon: 'fa-cloud-bolt', name: 'thunderstorm'},
  3: {icon: 'fa-cloud-rain', name: 'drizzle'},
  5: {icon: 'fa-cloud-showers-heavy', name: 'rain'},
  6: {icon: 'fa-snowflake', name: 'snow'},
  7: {icon: 'fa-smog', name: 'fog'},
  8: {icon: 'fa-cloud', name: 'cloud'},
  8001: {icon: 'fa-sun', name: 'clear'},
  8002: {icon: 'fa-moon', name: 'clear'}
}

class WeatherCard {
  constructor(element) {
    this.element = element
    this.lat = $(element).data('lat')
    this.lon = $(element).data('lon')
    this.city = $(element).data('city')
  }

  render() {
    let city = this.city;
    let element = this.element
    let match_condition = this.#match_condition

    let weather = new Weather(this.lat, this.lon)

    weather.request(function(data){
      let condition = match_condition(data)

      let card = CARD_TEMPLATE.replace('#temp#', Math.round(data.current.temp))
                              .replace('#min#', Math.round(data.daily[0].temp.min))
                              .replace('#max#', Math.round(data.daily[0].temp.max))
                              .replace('#name#', condition.name)
                              .replaceAll('#icon#', condition.icon)
                              .replace('#city#', city)

      if ($(element).attr('id') == 'geolocation-card') {
        card = card.replace("#geolocation#", "<i class='fas fa-location-arrow'></i>")
      } else {
        card = card.replace("#geolocation#", "")
      }
      
      $(element).empty().append($(card)).removeClass('loading').click(function() {
        let lat = $(this).data('lat')
        let lon = $(this).data('lon')
        let city = $(this).data('city')

        window.location.assign(`./weather.html?lat=${lat}&lon=${lon}&city=${city}`)
      })
    })
  }

  #match_condition(data) {
    // defend for empty weather array
    if (data.current.weather[0] == undefined) {
      return CONDITIONS[0]
    }

    let id = data.current.weather[0].id
    
    // reference this table to confirm icon
    // https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2

    if (id == 800) {
      id = 8001 // in daytime default
      if (data.current.dt < data.current.sunrise &&
          data.current.dt > data.current.sunset) {
        id = 8002
      }
    } else {
      id = Math.round(id / 100)
    }

    return CONDITIONS[id]
  }
}

module.exports = WeatherCard

