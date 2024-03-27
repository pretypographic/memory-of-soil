import Page from "./Page";

class Block extends Page {
  constructor({ renderer, tag, classNames }) {
    super(renderer);
    this.tag = tag;
    this.classNames = classNames;
  }

  createBlock() {
    this.block = document.createElement(this.tag);
    this.block.classList.add(...this.classNames);
    return this.block;
  }
}

export default Block;