function planBlock(tag, styleClasses = false, confName = false) {
  return {
    class: {
      tag: tag,
      styleClasses: styleClasses,
      confName: confName,
      matter: [],
      leaders: [],
      _processor: {},
    },
    addMatter: function (type, plan) {
      this.class.matter.push([type, plan]);
      if (type !== "element") {
        const name = type;
        this[name] = plan;
      }
    },
    addProcessor: function (event, callback) {
      this.class._processor[event] = callback;
      this.class.leaders.push(event);
    }
  }
};

class Block {
  constructor({ conf, plan, elementClass, blockClass }) {
    this._conf = conf;
    this.plan = plan;
    this._elementClass = elementClass;
    this._blockClass = blockClass;
    this._subBlocks = [];
  }

  initiate() {
    const { confName, matter } = this.plan.class;
    if (confName) {
      this._confRecord = this._conf.current[confName];
    }
    if (matter) {
      matter.forEach((block) => {
        if (block[0] !== "element") {
          this[block[0]] = this._blockClass({ 
            conf: this._conf, 
            plan: this.plan[block[0]],
            elementClass: this._elementClass,
            blockClass: this._blockClass
          });
          this[block[0]].initiate();
        }
      })
    }
  }

  create() {
    const { leaders, matter } = this.plan.class;
    this.block = this._addStructure();
    if (matter) {
      this._addMatter();
    };
    if (leaders) {
      this._addTime();
    };
    return this.block;
  }
  _addStructure() {
    if (!this.plan) {
      console.log("отстутствует план", this)
    }
    const { 
      tag, 
      styleClasses
    } = this.plan.class;
    const structure = document.createElement(tag);
    structure.classList.add(...styleClasses);
    return structure;
  }
  _addMatter() {
    const { matter } = this.plan.class;
    matter.map((item) => {
      if (item[0] === "element") {
        const newElement = this._elementClass({ 
          conf: this._conf, 
          plan: item[1],
          elementClass: this._elementClass
        });
        this.lock(newElement.create());
      } else {
        this._addSubBlock(item);
      }
    })
  }
  _addSubBlock(item) {
    this._subBlocks.push(item[0]);
    this.lock(this[item[0]].create());
  }
  _addTime() {
    const { leaders, _processor } = this.plan.class;
    leaders.forEach((leader) => {
      this.block.addEventListener(leader, _processor[leader])
    })
  }

  lock(elements) {
    if (Array.isArray(elements)) {
      this.block.append(...elements);
    } else {
      this.block.append(elements);
    }
  }

  remove() {
    this._stop();
    if (this._subBlocks) {
      this._subBlocks.forEach((block) => {
        this[block].remove();
      })
      this._subBlocks = [];
    }
    this.block.remove();
  }
  _stop() {
    const { leaders, _processor } = this.plan.class;
    if (leaders) {
      leaders.forEach((leader) => {
        this.block.removeEventListener(leader, _processor[leader])
      })
    }
  }

  toggleClass(className) {
    this.block.classList.toggle(className);
  }
}

export { planBlock, Block };