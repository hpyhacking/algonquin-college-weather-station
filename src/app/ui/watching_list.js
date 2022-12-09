const WeatherCard = require('../ui/weather_card')

const DEFAULT_LIST = [
  {city: 'Ottawa', lat: '45.4209', lon: '-75.6901'},
  {city: 'Pembroke', lat: '45.8261', lon: '-77.1135'},
  {city: 'Perth', lat: '44.9027', lon: '-76.2461'}
]

class WatchingList {
  #list
  #name

  get key() {
    return `watching-list-${this.#name}`
  }

  constructor(_name) {
    this.#name = _name ?? 'default'
    this.#list = JSON.parse(window.localStorage.getItem(this.key)) ?? DEFAULT_LIST
    window.localStorage.setItem(this.key, JSON.stringify(this.#list))
  }

  getList() {
    let list = JSON.parse(window.localStorage.getItem(this.key))
    return list
  }

  add(city, lat, lon) {
    let list = JSON.parse(window.localStorage.getItem(this.key))
    list.push({city: city, lat: lat, lon: lon})
    window.localStorage.setItem(this.key, JSON.stringify(list))
  }

  remove(lat, lon) {
    let list = JSON.parse(window.localStorage.getItem(this.key))

    let new_list = $.grep(list, function(i){ 
      return !(i.lat == lat && i.lon == lon)
    })

    window.localStorage.setItem(this.key, JSON.stringify(new_list))
  }

  render(element) {
    this.#list.forEach(function(item) {
      let card_wrapper = $("#weather-card-template").clone().removeAttr("id")

      let card = card_wrapper.find(".weather-card")
      card.data("lat", item.lat).data("lon", item.lon).data("city", item.city)
      new WeatherCard(card).render()

      card_wrapper.appendTo($(element))
    })
  }
}

module.exports = WatchingList

