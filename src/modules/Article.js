import { ElementIIK } from "./Element";

function planAticle() {
  return {
    class: {
      tag: "aticle",
      styleClasses: [],
      _processor: {},
      addProcessor: function (event, callback) {
        this._processor[event] = callback;
        this.leaders.push(event);
      }
    },
    matter: []
  }
};

class ArticleIIK extends ElementIIK {
  constructor({ configuration, plan, addSubElement }) {
    super({ configuration, plan, addSubElement });
  }

  _addMatter() {
    const { matter } = this._plan;
    if (typeof matter === "object") {
      if (Array.isArray(matter) && this._addSubElement) {
        const elements = matter[this._configuration.current.lang].map((plan) => {
          const subElement = this._addSubElement(plan);
          return subElement.create();
        })
        this.lock(elements);
      }
    }
  }
}

export { planAticle, ArticleIIK };