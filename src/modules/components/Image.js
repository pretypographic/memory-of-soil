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
  constructor({ plan, addElement }) {
    super({ plan, addElement });
  }

  _addStructure() {
    if (!this.plan.class) {
      console.log("_addStructure, ImageIIK", this.plan);
    } else {
      const {
        tag, 
        styleClasses, 
        _src, 
        _alt, 
        _style
      } = this.plan.class;
      const structure = document.createElement(tag);
      structure.classList.add(...styleClasses);
      structure.setAttribute("src", _src);
      structure.setAttribute("alt", _alt);
      if (_style) {
        structure.setAttribute("style", _style);
      };
      return structure;
    }
  }

  createElement() {
    this.element = this._addStructure();
    if (!this.element) {
      console.log("createElement, ImageIIK", this);
    }
    return this.element;
  }
}

export { planImage, ImageIIK }