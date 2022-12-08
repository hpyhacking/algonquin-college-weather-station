const Config = require('../modules/config')

// ONLY support Canada Postcode
const POSTCODE_REGEX = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
const CAN_ISO3611 = 'CA'

// reference Iain Fraser's answer in 
// https://stackoverflow.com/questions/3518504/regular-expression-for-matching-latitude-longitude-coordinates
const COORDINATE_REGEX = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/

const ZIP_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/zip'
const REVERSE_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/reverse'
const DIRECT_ENDPOINT = 'https://api.openweathermap.org/geo/1.0/direct'

class Geocoding {
  static #limit = 3

  static set limit(size) {
    this.#limit = size
  }

  static #get(url, callback) {
    $.get(url, function(data) {
      if (callback) {
        let arr = data

        if (Array.isArray(data) == false) {
          arr = [data]
        }

        let stand_data = $.map(arr, function(n) {
          return {city: n['name'], lat: n['lat'], lon: n['lon'], state: n['state'], country_code: n['country']}
        })
        callback(stand_data)
      }
    }).fail(function() {
      callback([])
    })
  }

  static query(query, callback) {
    if (POSTCODE_REGEX.test(query)) {
      let zip = `${encodeURIComponent(query)},${CAN_ISO3611}`
      let url = `${ZIP_ENDPOINT}?zip=${zip}&appid=${Config.API_KEY}`

      // {zip: 'POSTCODE', name: 'CityName', lat: LAT, lon: LON, country: 'CA'}
      this.#get(url, callback)
      return
    }

    if (COORDINATE_REGEX.test(query)) {

      let lat = encodeURIComponent(query.split(",")[0].trim())
      let lon = encodeURIComponent(query.split(",")[1].trim())
      let url = `${REVERSE_ENDPOINT}?lat=${lat}&lon=${lon}&limit=${this.#limit}&appid=${Config.API_KEY}`

      // [{"name":"CityName","local_names":{},"lat":LAT,"lon":LON,"country":"CA","state":STATE}]
      this.#get(url, callback)
      return
    }

    let q = encodeURIComponent(query.trim())
    let url = `${DIRECT_ENDPOINT}?q=${q}&limit=${this.#limit}&appid=${Config.API_KEY}`
    this.#get(url, callback)

    return 
  }
}

module.exports = Geocoding;

