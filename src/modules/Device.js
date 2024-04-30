import { Block } from "./Block";
import { Element } from "./Element";

function planDevice(styleClasses, indicator) {
  return {
    class: {
      styleClasses: styleClasses,
      indicator: indicator,
      blocks: []
    },
    addMatter: function (name, data, conf) {
      if (conf) {
        this.class.blocks.push([name, conf]);
      } else {
        this.class.blocks.push([name]);
      }
      this[name] = data;
    }
  }
};

class Device {
  constructor({ configuration, plan }) {
    this._configuration = configuration;
    this.body = document.querySelector("body");
    this.plan = plan;
    this._elementClass = function (data) {
      return new Element(data);
    };
    this._blockClass = function (data) {
      return new Block(data);
    };
  }

  initiate() {
    const { styleClasses, blocks } = this.plan.class;
    this.body.classList.add(styleClasses);
    this._showIndicator();
    blocks.forEach((block) => {
      this.plan[block[0]] = this._blockClass({ 
        configuration: this._configuration, 
        plan: this.plan[block[0]],
        elementClass: this._elementClass,
        blockClass: this._blockClass
      });
    });
  }
  _showIndicator() {
    this.indicator = this._elementClass({ 
      configuration: this._configuration, 
      plan: this.plan.class.indicator 
    });
    this.body.append(this.indicator.create());
  }
  _hideIndicator() {
    this.indicator.element.remove();
  }

  lock(blocks) {
    if (!blocks) {
      return;
    }
    if (!this.indicator) {
      this._showIndicator();
    }
    if (Array.isArray(blocks)) {
      const promises = blocks.map((block) => {
        return this._makePromise(block);
      });
      Promise.all(promises)
        .then((newBlocks) => {
          this.body.append(...newBlocks);
        })
        .then(() => {
          this._hideIndicator();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const promise = this._makePromise(blocks);
      promise
      .then((newBlock) => {
        this.body.append(newBlock);
      })
      .then(() => {
        this._hideIndicator();
      })
      .catch((err) => {
        console.error(err);
      });
    }
  }
  _makePromise(block) {
    return new Promise((resolve) => {
      resolve(block);
    })
  }

  remove(blocks) {
    if (Array.isArray(blocks)) {
      blocks.forEach((block) => {
        block.remove();
      })
    } else {
      blocks.remove();
    }
  }

  update() {
    const { blocks } = this.plan.class;
    blocks.forEach((block) => {
      const conf = block[1];
      this.lock(this.plan[block[0]].update(conf));
    });
  }
}

export { planDevice, Device};