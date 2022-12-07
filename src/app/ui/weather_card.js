const Weather = require('../modules/weather')

const CARD_TEMPLATE = `
<h3>#city#</h3>
<p>#temp#</p>
<p>#description#</p>
<p><span>L:</span> #min#</p>
<p><span>H:</span> #max#</p>
`

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
    let weather = new Weather(this.lat, this.lon)

    weather.request(function(data){
      let card = CARD_TEMPLATE.replace('#temp#', data.current.temp)
                              .replace('#description#', data.current.weather[0].description)
                              .replace('#min#', data.daily[0].temp.min)
                              .replace('#max#', data.daily[0].temp.max)
                              .replace('#city#', city)
      
      $(element).empty().append($(card))
    })
  }
}

module.exports = WeatherCard

