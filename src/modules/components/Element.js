function planElement() {
  return {
    class: {
      tag: "",
      styleClasses: [],
      leaders: [],
      _processor: {}
    },
    matter: []
  }
};

class ElementIIK {
  constructor({ plan, addSubElement, switchLocalization }) {
    this.plan = plan;
    this.class = plan.class;
    this.addSubElement = addSubElement;
    this.switchLocalization = switchLocalization;
  }

  _addStructure() {
    if (!this.plan) {
      console.log("_addStructure", this)
    }
    const { 
      tag, 
      styleClasses
    } = this.class;
    const structure = document.createElement(tag);
    structure.classList.add(...styleClasses);
    return structure;
  }

  _addMatter() {
    const { matter } = this.plan;
    if (!matter || !Array.isArray(matter)) {
      console.log("_addMatter, ElementIIK", matter);
    } else {
      matter.map((item) => {
        if (typeof item === "string") {
          this.element.textContent = matter.join("");
        } else if (Array.isArray(item)) {
          if (this.switchLocalization) {
            this.switchLocalization(item);
          }
        } else if (typeof item === "object") {
          if (this.addSubElement) {
            const subStructure = this.addSubElement(item);
            this.element.append(subStructure);
          }
        }
      })
    }
    return;
  }

  _addTime() {
    const { leaders, _processor } = this.class;
    leaders.forEach((leader) => {
      this.element.addEventListener(leader, _processor[leader])
    })
  }

  _stop() {
    const { leaders, _processor } = this.class;
    leaders.forEach((leader) => {
      this.element.removeEventListener(leader, _processor[leader])
    })
  }

  createElement() {
    this.element = this._addStructure();
    const { matter } = this.plan;
    const { leaders } = this.class;
    if (!this.element) {
      console.log("createElement, ElementIIK", this);
    }
    if (matter) {
      this._addMatter();
    } 
    if (leaders) {
      this._addTime();
    }
    return this.element;
  }

  removeElement() {
    this._stop();
    this.element.remove();
  }
}

export { planElement, ElementIIK };