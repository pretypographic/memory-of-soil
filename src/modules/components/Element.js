import Block from "./Block";

class Element extends Block {
  constructor({ tag, classNames, text }) {
    super(tag, classNames);
    this.text = text;
  }

  createElement(elements) {
    this.element = document.createElement(this.tag);
    this.element.classList.add(...this.classNames);
    this.element.textContent = this.text;
    if (elements) {
      this.element.append(...elements);
    }
    return this.element;
  }
}

export default Element;