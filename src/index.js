"use strict";

import "./index.css";
import { BlockIIK } from "./modules/components/Block.js";
import { ElementIIK } from "./modules/components/Element.js";
import { ButtonIIK } from "./modules/components/Button.js";
import { ImageIIK } from "./modules/components/Image.js";
import plan from "./utils/plan.js";
console.log("plan: ", plan);

const page = document.querySelector("body");

const loader = document.createElement("div");
loader.textContent = "загрузка...";
loader.classList.add("loader");
page.append(loader);

const languagesContext = {
  currentOption: "eng",
  setSwitch: function (element) {
    if (this.switch) {
      this.switch.classList.remove("header__button_active");
    };
    element.classList.add("header__button_active");
    this.switch = element;
  },
  handleSwitch: function (element) {
    this.setSwitch(element);
    this.currentOption = element.textContent;
  },
  getIndex: function () {
    console.log("getIndex");
    // return plan.header.languages.indexOf(this.currentOption);
  }
}
function addProcessor(event, callback, plan) {
  plan.class._processor[event] = callback;
  plan.class.leaders.push(event);
}

function switchLanguage(event) {
  if (event.target.classList.contains("header__button")) {
    languagesContext.handleSwitch(event.target);
  }
}

function handleDecorLight() {
  // найти способ лучше: 
  // функция снижает производительность. 
  // декор надо передать снаружи.
  // console.log(x.element)
  const decor = document.querySelector(".figure__section_type_decor");
  decor.classList.toggle("figure__section_lightOn");
}

function handleMouseOver(event) {
  if (event.target.classList.contains("figure__button")) {
    const button = event.target;
    button.classList.add("figure__button_focused");
    handleDecorLight();
  }
}

function handleMouseOut(event) {
  if (event.target.classList.contains("figure__button")) {
    const button = event.target;
    button.classList.remove("figure__button_focused");
    handleDecorLight();
  }
}

const renderHeader = new Promise((resolve, reject) => {
  const planHeader = plan.header;
  const Header = new BlockIIK({ plan: planHeader });
  const newBlock = Header.createElement();
  
  const planHeaderAsideLeft = plan.header.asideLeft;
  addProcessor("click", switchLanguage, planHeaderAsideLeft);
  const HeaderAsideLeft = new ElementIIK ({ 
    plan: planHeaderAsideLeft,
    addSubElement: function (plan) {
      const HeaderButton = new ButtonIIK({ plan });
      return HeaderButton.createElement();
    }
  });
  const elementHeaderAsideLeft = HeaderAsideLeft.createElement();

  const planHeaderAsideRight = plan.header.asideRight;
  const HeaderAsideRight = new ElementIIK ({ 
    plan: planHeaderAsideRight,
    addSubElement: function (plan) {
      const HeaderButton = new ButtonIIK({ plan });
      return HeaderButton.createElement();
    }
  })
  const elementHeaderAsideRight = HeaderAsideRight.createElement()
  
  newBlock.append(elementHeaderAsideLeft, elementHeaderAsideRight);

  resolve(newBlock);
});

const renderFigure = new Promise((resolve, reject) => {
  const planFigure = plan.figure;
  const Figure = new BlockIIK({ plan: planFigure });
  const newBlock = Figure.createElement();

  const planSectionNav = plan.figure.sectionNav;
  addProcessor("mouseover", handleMouseOver, planSectionNav);
  addProcessor("mouseout", handleMouseOut, planSectionNav);
  const SectionNav = new ElementIIK({
    plan: planSectionNav,
    addSubElement: function (plan) {
      const FugureButton = new ButtonIIK({
        plan,
        addSubElement: function (plan) {
          const FigureImg = new ImageIIK({ plan });
          return FigureImg.createElement();
        }
      });
      return FugureButton.createElement();
    }
  });
  const elementSectionNav = SectionNav.createElement();

  const planSectionDecor = plan.figure.sectionDecor;
  const SectionDecor = new ElementIIK({
    plan: planSectionDecor,
    addSubElement: function (plan) {
      const FigureImg = new ImageIIK({ plan });
      return FigureImg.createElement();
    }
  });
  const elementSectionDecor = SectionDecor.createElement();
  
  newBlock.append(elementSectionNav, elementSectionDecor);

  resolve(newBlock);
})

Promise.all([renderHeader, renderFigure])
  .then((values) => {
    page.append(...values);
  })
  .then(() => {
    loader.remove();
  })
  .catch((err) => {
    console.error(err);
  });
