function planElement(tag, styleClasses = false, confName = false) {
  return {
    class: {
      tag: tag,
      styleClasses: styleClasses,
      confName: confName
    },
    matter: [],
    addMatter: function (type, data, conf = false) {      
      if (conf) {
        this.matter.push([type, data, conf]);
      } else {
        this.matter.push([type, data]);
      }
    }
  }
};

class Element {
  constructor({ conf, plan, elementClass }) {
    this._conf = conf;
    this.plan = plan;
    this.matter = plan.matter;
    this._elementClass = elementClass;
  }

  create() {
    this.element = this._addStructure();
    this._addMatter();
    return this.element;
  }
  _addStructure() {
    if (!this.plan) {
      console.log("отстутствует план", this)
    }
    const { tag, styleClasses, styleMod } = this.plan.class;
    const structure = document.createElement(tag);
    if (styleClasses) {
      structure.classList.add(...styleClasses);
    }
    if (styleMod) {
      structure.setAttribute("style", styleMod);
    }
    return structure;
  }
  _addMatter() {
    this.matter.map((item) => {
      if (item[0] === "element") {
        const newElement = this._elementClass({ 
          conf: this._conf, 
          plan: item[1],
          elementClass: this._elementClass
        });
        this.lock(newElement.create());
      } else if (item[0] === "text") {
        this.element.textContent = item[1];
      } else if (item[0] === "image") {
        this.element.setAttribute("src", item[1]);
      }
    })
  }

  lock(elements) {
    if (Array.isArray(elements)) {
      this.element.append(...elements);
    } else {
      this.element.append(elements);
    }
  }
}

export { planElement, Element };