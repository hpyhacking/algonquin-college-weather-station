class Config {
  static #apikey

  static get apikey() {
    return this.#apikey
  }

  static {
    this.#apikey = _API_KEY
  }
}

module.exports = Config;

