import { BlockIIK } from "./Block";

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

class ElementIIK extends BlockIIK {
  constructor({ plan, addSubElement }) {
    super({ plan });
    this.addSubElement = addSubElement;
  }

  _addMatter() {
    const { matter } = this.plan;
    if (!matter) {
      console.log("_addMatter, ElementIIK", matter);
      return;
    } else if (typeof matter[0] === "string") {
      this.element.textContent = matter.join("");
    } else if (typeof matter[0] === "object") {
      if (this.addSubElement) {
        matter.map((plan) => {
          const subStructure = this.addSubElement(plan);
          this.element.append(subStructure);
        })
      }
    }
  }

  _addTime() {
    const { leaders, _processor } = this.plan.class;
    leaders.forEach((leader) => {
      this.element.addEventListener(leader, _processor[leader])
    })
  }

  _stop() {
    const { leaders, _processor } = this.plan.class;
    leaders.forEach((leader) => {
      this.element.removeEventListener(leader, _processor[leader])
    })
  }

  createElement() {
    this.element = this._addStructure();
    if (this.plan.matter) {
      this._addMatter();
    } 
    if (this.plan.class.leaders) {
      this._addTime();
    }
    if (!this.element) {
      console.log("createElement, ElementIIK", this);
    }
    return this.element;
  }

  removeElement() {
    this._stop();
    this.element.remove();
  }
}

export { planElement, ElementIIK };