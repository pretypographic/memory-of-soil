class Device {
  constructor({ plan }) {
    this.body = document.querySelector("body");
  }

  initiate() {
    
  }

  add(elements) {
    this.body.append(...elements);
  }

  remove(elements) {
    elements.forEach((element) => {
      element.remove();
    })
  }

  update(elements) {
    elements.forEach((element) => {
      element.update();
    })
  }
}

export default Device;