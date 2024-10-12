function planBlock(tag, styleClasses = false, confName = false) {
  return {
    class: {
      tag: tag,
      styleClasses: styleClasses,
      confName: confName,
      matter: [],
      // triggers: - ?
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
      const action = (event) => {
        if (this._chek(event)) {
          callback();
        };
      }
      this.class._processor[event] = action;
      this.class.leaders.push(event);
    },
    _chek: function (event) {
      let newChek = this.class.styleClasses.some((string) => {
        return event.target.parentElement.classList.contains(string);
      });
      if (newChek) {
        return true;
      } else {
        return false;
      }
    }
  }
};

// Stage
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
          if (!block[1].class) {
            block[1] = block[1][confName];  
          }
          this[block[0]] = this._blockClass({ 
            conf: this._conf, 
            plan: block[1],
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
  // _addSpace
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
    const { matter, confName } = this.plan.class;
    matter.map((item) => {
      let type = item[0];
      let data = item[1];
      if (type === "element") {
        if (Array.isArray(data)) {
          data = data[0][this._conf.current[confName]];
          console.log(data);
          return data.map((plan) => {
            const newElement = this._elementClass({ 
              conf: this._conf, 
              plan: plan,
              elementClass: this._elementClass
            });
            this.lock(newElement.create());
          })
        };
        const newElement = this._elementClass({ 
          conf: this._conf,
          plan: data,
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
  // _addMovement
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

  matter() {
    return Array.from(this.block.children);
  }
}

export { planBlock, Block };