// function planBlock() {
//   return {
//     class: {
//       tag: "",
//       styleClasses: []
//     }
//   }
// };

// class BlockIIK {
//   constructor({ plan }) {
//     this.plan = plan;
//   }

//   _addStructure() {
//     if (!this.plan) {
//       console.log("_addStructure", this)
//     }
//     const { 
//       tag, 
//       styleClasses
//     } = this.plan.class;
//     const structure = document.createElement(tag);
//     structure.classList.add(...styleClasses);
//     return structure;
//   }

//   createElement() {
//     this.element = this._addStructure();
//     if (!this.element) {
//       console.log("createElement", this);
//     }
//     return this.element;
//   }

//   removeElement() {
//     this.element.remove();
//   }

//   addElement(element) {
//     const newElement = element.createElement();
//     this.element.append(newElement);
//   }
// }

// export { planBlock, BlockIIK };