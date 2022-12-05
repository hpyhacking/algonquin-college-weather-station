class Config {
  static #apikey

  static get API_KEY() {
    return this.#apikey
  }

  static {
    this.#apikey = _API_KEY
  }
}

module.exports = Config;

