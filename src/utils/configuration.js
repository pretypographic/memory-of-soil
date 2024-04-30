const configuration = {
  current: {
    load: true,
    lang: 0,
    headerBlock: true,
    figureBlock: true,
    projectorBlock: false,
  },
  _languages: ["eng", "rus"],
  getIndex: function (string) {
    return this._languages.indexOf(string);
  }
}

export default configuration;