const Weather = require('../modules/weather')

const CARD_TEMPLATE = `
<div>
  <h6>#city#</h6>
  <p class=''>#name#</p>
  <p class='range'><span>L:</span> #min#</p>
  <p class='range'><span>H:</span> #max#</p>
</div>
<div>
  <span>#temp#</span>
</div>
<i class='fas #icon#'></i>
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

      let card = CARD_TEMPLATE.replace('#temp#', data.current.temp)
                              .replace('#min#', data.daily[0].temp.min)
                              .replace('#max#', data.daily[0].temp.max)
                              .replace('#name#', condition.name)
                              .replace('#icon#', condition.icon)
                              .replace('#city#', city)
      
      $(element).empty().append($(card)).toggleClass('card')
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
      if (data.current.dt < current.sunrise &&
          data.current.dt > current.sunse) {
        id = 8002
      }
    } else {
      id = Math.round(id / 100)
    }

    return CONDITIONS[id]
  }
}

module.exports = WeatherCard

