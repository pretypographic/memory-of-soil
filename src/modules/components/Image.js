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
  constructor({ plan, addElement, switchLocalization }) {
    super({ plan, addElement, switchLocalization });
  }

  _addStructure() {
    if (!this.class) {
      console.log("_addStructure, ImageIIK", this.plan);
    } else {
      const {
        tag, 
        styleClasses,
        _alt, 
        _style
      } = this.class;
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
    const { _src } = this.class;
    if (Array.isArray(_src)) {
      if (this.switchLocalization) {
        this.switchLocalization(_src);
      }
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