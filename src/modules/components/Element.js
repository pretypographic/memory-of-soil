function planElement() {
  return {
    class: {
      tag: "",
      styleClasses: [],
      leaders: [],
      _processor: {},
      addProcessor: function (event, callback) {
        this._processor[event] = callback;
        this.leaders.push(event);
      }
    },
    matter: []
  }
};

class ElementIIK {
  constructor({ configuration, plan, addSubElement }) {
    this._configuration = configuration;
    this._plan = plan;
    this._addSubElement = addSubElement;
  }

  create() {
    const { matter } = this._plan;
    const { leaders } = this._plan.class;
    this.element = this._addStructure();
    if (matter) {
      this._addMatter();
    } 
    if (leaders) {
      this._addTime();
    }
    return this.element;
  }
  _addStructure() {
    if (!this._plan) {
      console.log("отстутствует план", this)
    }
    const { 
      tag, 
      styleClasses
    } = this._plan.class;
    const structure = document.createElement(tag);
    structure.classList.add(...styleClasses);
    return structure;
  }
  _addMatter() {
    const { matter } = this._plan;
    matter.map((item) => {
      if (typeof item === "string") {
        this.element.textContent = matter.join("");
      } else if (typeof item === "object") {
        if (Array.isArray(item)) {
          this.element.textContent = item[this._configuration.current.lang];
        } else if (this._addSubElement) {
          const subElement = this._addSubElement(item);
          this.element.append(subElement.create());
        }
      }
    })
  }
  _addTime() {
    const { leaders, _processor } = this._plan.class;
    leaders.forEach((leader) => {
      this.element.addEventListener(leader, _processor[leader])
    })
  }

  update() {
    this.remove();
    const updatedElement = this.create();
    return updatedElement;
  }

  remove() {
    if (this.element) {
      this._stop();
      this.element.remove();
    } else {
      console.error("элемент не найден");
    }
  }
  _stop() {
    const { leaders, _processor } = this._plan.class;
    if (leaders) {
      leaders.forEach((leader) => {
        this.element.removeEventListener(leader, _processor[leader])
      })
    }
  }

  lock(elements) {
    if (this.element) {
      this.element.append(...elements);
    } else {
      console.log("отсутствует материнский элемент");
    }
  }
}

export { planElement, ElementIIK };