import { ElementIIK } from "./Element";

function planSection() {
  return {
    class: {
      tag: "section",
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

class SectionIIK extends ElementIIK {
  constructor({ configuration, plan, addSubElement }) {
    super({ configuration, plan, addSubElement });
  }

  _addMatter() {
    const { matter } = this._plan;
    const strings = [];
    matter.map((item, i) => {
      if (typeof item === "string") {
        if (i === 0) {
          if (item.length === 0) {
            return;
          };
          const heading = document.createElement("h2");
          heading.textContent = item;
          return strings.push(heading);
        } 
        const paragraph = document.createElement("p");
        paragraph.textContent = item;
        return strings.push(paragraph);
      }
    });
    this.lock(strings)
  }
}

export { planSection, SectionIIK };