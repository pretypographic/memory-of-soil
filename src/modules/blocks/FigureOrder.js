class FigureOrder {
  constructor({ figureBlock }) {
    this._figureBlock = figureBlock;
  }

  _handleDecorLight() {
    this._figureBlock.sectionDecor.block.classList.toggle("figure__section_lightOn");
  }

  handleMouseOver(event) {
    if (event.target.classList.contains("figure__button")) {
      const button = event.target;
      button.classList.add("figure__button_focused");
      this._handleDecorLight();
    }
  }

  handleMouseOut(event) {
    if (event.target.classList.contains("figure__button")) {
      const button = event.target;
      button.classList.remove("figure__button_focused");
      this._handleDecorLight();
    }
  }
}

export { FigureOrder }