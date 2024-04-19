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

  _addStructure() {
    if (!this._plan.class) {
      console.log("_addStructure, ImageIIK", this.plan);
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

  createElement() {
    this.element = this._addStructure();
    const { _src } = this._plan.class;
    if (Array.isArray(_src)) {
      const src = this._switchLocalization(_src);
      this.element.setAttribute("src", src);
    } else {
      this.element.setAttribute("src", _src);
    }
    if (!this.element) {
      console.log("createElement, ImageIIK", this);
    }
    return this.element;
  }
}

export { planImage, ImageIIK }