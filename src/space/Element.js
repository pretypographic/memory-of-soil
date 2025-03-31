function planElement(tag, styleClasses = false, confName = false) {
  return {
    class: {
      tag: tag,
      styleClasses: styleClasses,
      confName: confName
      // styleMod:
    },
    matter: [],
    addMatter: function (type, data, matterStyleClasses) {
      if (matterStyleClasses) {
        this.matter.push([type, data, matterStyleClasses]);
      } else {
        this.matter.push([type, data]);
      }
    }
  };
};

// Work
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
    if (!this.plan.class.tag) {
      console.log("plan needed", this)
    };
    const { tag, styleClasses, styleMod, id, type, controls, loop, src } = this.plan.class;
    const structure = document.createElement(tag);
    if (styleClasses) {
      structure.classList.add(...styleClasses);
    };
    if (styleMod) {
      structure.setAttribute("style", styleMod);
    };
    if (id) {
      structure.setAttribute("id", id);
    };
    if (controls) {
      structure.setAttribute("controls", controls);
    };
    if (type) {
      structure.setAttribute("type", type);
    };
    if (loop) {
      structure.setAttribute("loop", loop);
    };
    if (src) {
      structure.setAttribute("src", src);
    };
    return structure;
  }
  _addMatter() {
    this.matter.map((item) => {
      let type = item[0];
      let data = item[1];
      if ((type !== "element" && typeof data === "object")) {
        data = data[this._conf.current[this.plan.class.confName]];
      };
      if (type === "element") {
        const newElement = this._elementClass({ 
          conf: this._conf, 
          plan: data,
          elementClass: this._elementClass
        });
        this.lock(newElement.create());
      } else if (type === "text") {
        this.element.textContent = data;
      } else if (type === "columns") {
        data.forEach((array, i) => {
          const matterStyleClasses = item[2];
          const section = document.createElement("section");
          if (Array.isArray(matterStyleClasses)) {
            matterStyleClasses.forEach((string) => {
              section.classList.add(string);
            })
          } else {
            section.classList.add(matterStyleClasses);
          }
          section.setAttribute("id", i);
          array.forEach((string, i) => {
            if (i === 0) {
              if (!string) {
                return;
              }
              const title = document.createElement("h2");
              title.textContent = string;
              section.append(title);
            } else {
              const paragraph = document.createElement("p");
              paragraph.textContent = string;
              section.append(paragraph);
            };
          });
          this.lock(section);
        });
      } else if (type === "image") {
        this.element.setAttribute("src", data);
      };
    });
  }

  lock(elements) {
    if (Array.isArray(elements)) {
      this.element.append(...elements);
    } else {
      this.element.append(elements);
    };
  }
};

export { planElement, Element };