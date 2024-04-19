const configuration = {
  current: {
    lang: 0,
  },
  _languages: ["eng", "rus"],
  initiate: function ({ element }) {
    _setSwitch(element);
  },
  handleSwitch: function (element) {
    this._setSwitch(element);
    this.current.lang = this.getIndex(element.textContent);
  },
  _setSwitch: function (element) {
    if (this.switcher) {
      this.switcher.classList.remove("header__button_active");
    }
    element.classList.add("header__button_active");
    this.switcher = element;
  },
  getIndex: function (string) {
    return this._languages.indexOf(string);
  }
}

export default configuration;