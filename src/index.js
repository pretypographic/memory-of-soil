"use strict";

import "./index.css";
import { LoaderIIK } from "./modules/components/Loader.js";
import { ElementIIK } from "./modules/components/Element.js";
import { ButtonIIK } from "./modules/components/Button.js";
import { ImageIIK } from "./modules/components/Image.js";
import plan from "./utils/plan.js";
import configuration from "./utils/configuration.js";

const page = document.querySelector("body");

const loaderPlan = plan.loader;
const Loader = new LoaderIIK({ configuration, plan: loaderPlan });

const planHeader = plan.header;
const Header = new ElementIIK({ configuration, plan: planHeader });

const planHeaderAsideLeft = plan.header.asideLeft;
planHeaderAsideLeft.class.addProcessor("click", switchLanguage);
const HeaderAsideLeft = new ElementIIK ({ 
  configuration,
  plan: planHeaderAsideLeft,
  addSubElement: function (plan) {
    const HeaderButton = new ButtonIIK({ 
      configuration, 
      plan
    });
    return HeaderButton;
  }
});

const planHeaderAsideRight = plan.header.asideRight;
const HeaderAsideRight = new ElementIIK ({ 
  configuration,
  plan: planHeaderAsideRight,
  addSubElement: function (plan) {
    const HeaderButton = new ButtonIIK({ configuration, plan });
    return HeaderButton;
  }
});

const planFigure = plan.figure;
const Figure = new ElementIIK({ configuration, plan: planFigure });

const planSectionNav = plan.figure.sectionNav;
planSectionNav.class.addProcessor("mouseover", handleMouseOver);
planSectionNav.class.addProcessor("mouseout", handleMouseOut);
const SectionNav = new ElementIIK({
  configuration,
  plan: planSectionNav,
  addSubElement: function (plan) {
    const FugureButton = new ButtonIIK({
      configuration,
      plan,
      addSubElement: function (plan) {
        const FigureImg = new ImageIIK({ configuration, plan });
        return FigureImg;
      }
    });
    return FugureButton;
  }
});

const planSectionDecor = plan.figure.sectionDecor;
const SectionDecor = new ElementIIK({
  configuration,
  plan: planSectionDecor,
  addSubElement: function (plan) {
    const FigureImg = new ImageIIK({ configuration, plan });
    return FigureImg;
  }
});

function switchLanguage(event) {
  if (event.target.classList.contains("header__button")) {
    configuration.handleSwitch(event.target);
    Header.lock([HeaderAsideRight.update()]);
    Figure.lock([SectionNav.update()]);
  }
}

function handleDecorLight() {
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

Loader.create();
page.append(Loader.element);

const renderHeader = new Promise((resolve, reject) => {
  Header.create();  
  Header.lock([HeaderAsideLeft.create(), HeaderAsideRight.create()]);
  resolve(Header.element);
});

const renderFigure = new Promise((resolve, reject) => {
  Figure.create();
  Figure.lock([SectionNav.create(), SectionDecor.create()]);
  resolve(Figure.element);
})

Promise.all([renderHeader, renderFigure])
  .then((values) => {
    page.append(...values);
  })
  .then(() => {
    Loader.remove();
  })
  .catch((err) => {
    console.error(err);
  });
