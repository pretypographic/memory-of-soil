import { ElementIIK } from "./Element";

function planImage() {
  return {
    class: {
      tag: "img",
      styleClasses: [],
      _src: "",
      _alt: "PROD",
      _style: ""
    }
  }
};

class ImageIIK extends ElementIIK {
  constructor({ configuration, plan }) {
    super({ configuration, plan });
  }

  create() {
    this.element = this._addStructure();
    const { _src } = this._plan.class;
    if (Array.isArray(_src)) {
      const src = _src[this._configuration.current.lang];
      this.element.setAttribute("src", src);
    } else {
      this.element.setAttribute("src", _src);
    }
    return this.element;
  }
  _addStructure() {
    if (!this._plan) {
      console.log("отстутствует план", this.plan);
    } else {
      const {
        tag, 
        styleClasses,
        _alt, 
        _style
      } = this._plan.class;
      const structure = document.createElement(tag);
      structure.classList.add(...styleClasses);
      structure.setAttribute("alt", _alt);
      if (_style) {
        structure.setAttribute("style", _style);
      };
      return structure;
    }
  }
}

export { planImage, ImageIIK }