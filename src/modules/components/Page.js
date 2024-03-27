class Page {
  constructor({ renderer }) {
    this.body = document.querySelector("body");
    this._renderer = renderer;
  }

  renderElements() {
    this._renderer();
  }
}

export default Page;