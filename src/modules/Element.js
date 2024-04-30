function planElement(tag, styleClasses = false, styleMod = false) {
  return {
    class: {
      tag: tag,
      styleClasses: styleClasses,
      styleMod: styleMod
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
  constructor({ configuration, plan, elementClass }) {
    this._configuration = configuration;
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
      if (item[2]) {
        this._checkConf(item);
      } else {
        this._checkType(item);
      }
    })
  }
  _checkConf(item) {
    Object.keys(item[2]).forEach((key) => {
      if (Object.hasOwn(this._configuration.current, key) && item[2][key] === this._configuration.current[key]) {
        this._checkType(item);
      } else {
        return;
      }
    });
  }
  _checkType(item) {
    if (item[0] === "element") {
      const newElement = this._elementClass({ 
        configuration: this._configuration, 
        plan: item[1],
        elementClass: this._elementClass
      });
      this.lock(newElement.create());
    } else if (item[0] === "text") {
      this.element.textContent = item[1];
    } else if (item[0] === "image") {
      this.element.setAttribute("src", item[1]);
    }
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