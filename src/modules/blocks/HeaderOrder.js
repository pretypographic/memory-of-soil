class HeaderOrder {
  constructor({ devise, configuration, parameters }) {
    this._devise = devise;
    this._configuration = configuration;
    this._parameters = parameters;
  }

  setSwitch (button) {
    if (this.switcher) {
      this.switcher.classList.remove("header__button_active");
    }
    button.classList.add("header__button_active");
    this.switcher = button;
  }

  switchLanguage(event) {
    if (event.target.classList.contains("header__button")) {
      const button = event.target;
      const textContent = button.textContent.toLowerCase();
      if (this._configuration._languages.some(lang => lang = textContent)) {
        this.setSwitch(button);
        this._handleSwitch(button);
        this._devise.update();
      }
    }
  }
  _handleSwitch (button) {
    this._configuration.current.lang = this._configuration.getIndex(button.textContent);
  }
  
  handleNavClick(event) {
    if (event.target.classList.contains("header__button")) {
      const button = event.target;
      const textContent = button.textContent.toLowerCase();
      if (this._parameters._nav.some(nav => nav = textContent)) {
        this._configuration.current.figureBlock = !this._configuration.current.figureBlock;
        this._configuration.current.projectorBlock = !this._configuration.current.projectorBlock;
        this._devise.update();
      }
    }
  }
}

export { HeaderOrder }