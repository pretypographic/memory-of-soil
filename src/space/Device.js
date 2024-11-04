import { Block } from "./Block";
import { Element } from "./Element";

function planDevice(styleClasses, indicator) {
  return {
    class: {
      styleClasses: styleClasses,
      indicator: indicator,
      frames: []
    },
    addFrame: function (name, plan) {
      this.class.frames.push([name]);
      this[name] = plan;
    }
  }
};

// 
class Device {
  constructor({ conf, plan }) {
    this._conf = conf;
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
    const { styleClasses } = this.plan.class;
    this.body.classList.add(styleClasses);
    this._showIndicator();
    this._addFrames();
  }
  _addFrames() {
    const { frames } = this.plan.class;
    frames.forEach((frame) => {
      this[frame] = this._blockClass({ 
        conf: this._conf, 
        plan: this.plan[frame],
        elementClass: this._elementClass,
        blockClass: this._blockClass
      });
      this[frame].initiate();
    });
  }
  _showIndicator() {
    this.indicator = this._elementClass({ 
      conf: this._conf, 
      plan: this.plan.class.indicator 
    });
    this.body.append(this.indicator.create());
  }
  _hideIndicator() {
    this.indicator.element.remove();
  }

  lock(frames) {
    if (!this.indicator) {
      this._showIndicator();
    }
    if (Array.isArray(frames)) {
      const promises = frames.map((frame) => {
        return this._makePromise(frame);
      });
      Promise.all(promises)
        .then((newFrames) => {
          this.body.append(...newFrames);
        })
        .then(() => {
          this._hideIndicator();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const promise = this._makePromise(frames);
      promise
      .then((newFrame) => {
        this.body.append(newFrame);
      })
      .then(() => {
        this._hideIndicator();
      })
      .catch((err) => {
        console.error(err);
      });
    }
    return this.body;
  }
  _makePromise(frame) {
    return new Promise((resolve) => {
      resolve(frame);
    })
  }

  remove(frames) {
    if (Array.isArray(frames)) {
      frames.forEach((frame) => {
        frame.remove();
      })
    } else {
      frames.remove();
    }
  }
}

export { planDevice, Device};