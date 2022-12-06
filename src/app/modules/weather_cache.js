const FIVE_MINS = 5 * 60 * 1000

class WeatherCache {

  static #convert(str_or_num) {
    let f = parseFloat(str_or_num)

    if (f >= 0) {
      return `+${f.toFixed(4)}`
    } else {
      return f.toFixed(4)
    }
  }

  static #key(lat, lon) {
    return `weather[${this.#convert(lat)},${this.#convert(lon)}]`
  }

  static set(lat, lon, data) {
    let key = this.#key(lat, lon)
    let expired_at = Date.now() + FIVE_MINS

    let warpper = JSON.stringify({expired_at: expired_at, data: data})
    window.localStorage.setItem(key, warpper)

    return true
  }

  static get(lat, lon) {
    let key = this.#key(lat, lon)
    let warpper = window.localStorage.getItem(key)

    if (warpper == null) {
      return undefined
    }

    warpper = JSON.parse(warpper)

    if (warpper && warpper.expired_at > Date.now()) {
      return warpper.data
    } else {
      window.localStorage.removeItem(key)
      return undefined
    }
  }
}

module.exports = WeatherCache;


