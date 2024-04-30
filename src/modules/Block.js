function planBlock(tag, styleClasses) {
  return {
    class: {
      tag: tag,
      styleClasses: styleClasses,
      blocks: [],
      leaders: [],
      _processor: {},
    },
    matter: [],
    addMatter: function (type, data, conf = false) {
      const dataTypes = ["element", "text", "image"];
      if (!dataTypes.some(t => t === type)) {
        const name = type;
        if (conf) {
          this.class.blocks.push([name, conf]);
        } else {
          this.class.blocks.push([name]);
        }
        this[name] = data;
      } else {
        if (conf) {
          this.matter.push([type, data, conf]);
        } else {
          this.matter.push([type, data]);
        }
      }
    },
    addProcessor: function (event, callback) {
      this.class._processor[event] = callback;
      this.class.leaders.push(event);
    }
  }
};

class Block {
  constructor({ configuration, plan, elementClass, blockClass }) {
    this._configuration = configuration;
    this.plan = plan;
    this.matter = plan.matter;
    this._elementClass = elementClass;
    this._blockClass = blockClass;
  }

  initiate() {
    const { blocks } = this.plan.class;
    if (blocks) {
      blocks.forEach((block) => {
        this[block[0]] = this._blockClass({ 
          configuration: this._configuration, 
          plan: this.plan[block[0]],
          elementClass: this._elementClass,
          blockClass: this._blockClass
        });
      });
    }
  }
  
  create() {
    const { leaders, blocks } = this.plan.class;
    this.block = this._addStructure();
    if (blocks) {
      this._addSubBlock();
    };
    if (this.matter) {
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
  _addSubBlock() {
    const { blocks } = this.plan.class;
    blocks.forEach((block) => {
      if (block[1]) {
        Object.keys(block[1]).forEach((key) => {
          if (Object.hasOwn(this._configuration.current, key) && block[1][key] === this._configuration.current[key]) {
            this.lock(this[block[0]].create());
          } else {
            return;
          }
        });
      } else {
        this.lock(this[block[0]].create());
      }
    });
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
    }
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
    if (this.plan.class.blocks) {
      this.plan.class.blocks.forEach((block) => {
        this[block[0]].remove();
      })
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

  update(conf) {
    if (this.block) {
      this.remove();
    }
    if (conf) {
      const chek = Object.keys(conf).every((key) => {
        return Object.hasOwn(this._configuration.current, key) && conf[key] === this._configuration.current[key];
      });
      if (chek) {
        return this.create();
      } else {
        return;
      }
    } else {
      return this.create();
    }
  }
}

export { planBlock, Block };