import { ElementIIK } from "./Element";

function planButton() {
  return {
    class: {
      tag: "button",
      styleClasses: [],
      leaders: [],
      _type: "button",
      _ariaLabel: "PROD",
      _style: ""
    },
    matter: []
  }
};

class ButtonIIK extends ElementIIK {
  constructor({ plan, addSubElement, switchLocalization }) {
    super({ plan, addSubElement, switchLocalization });
  }

  _addStructure() {
    if (!this.class) {
      console.log("_addStructure, ButtonIIK", this.plan);
    } else {
      const {
        tag, 
        styleClasses, 
        _style, 
        _type, 
        _ariaLabel
      } = this.class;
      const structure = document.createElement(tag);
      structure.classList.add(...styleClasses);
      structure.setAttribute("type", _type);
      structure.setAttribute("aria-label", _ariaLabel);
      if (_style) {
        structure.setAttribute("style", _style);
      };
      return structure;
    }
  }
};

export { planButton, ButtonIIK };