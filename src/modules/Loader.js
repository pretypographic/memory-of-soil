import { ElementIIK } from "./Element";

function planLoader() {
  return {
    class: {
      tag: "",
      styleClasses: []
    },
    matter: []
  }
};

class LoaderIIK extends ElementIIK {
  constructor({ configuration, plan }) {
    super({ configuration, plan });
  }
};

export { planLoader, LoaderIIK };