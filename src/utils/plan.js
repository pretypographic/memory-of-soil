"use strict";
import parameters from "./parameters.js";
import { planElement } from "../modules/components/Element.js";
import { planButton } from "../modules/components/Button.js";
import { planImage } from "../modules/components/Image.js";

function _addAsideLeft() {
  const asideLeft = planElement();
  asideLeft.class.tag = "aside";
  asideLeft.class.styleClasses = [
    "header__aside", 
    "header__aside_type_left"
  ];
  asideLeft.matter = parameters._languages.map((string) => {
    const languageButton = planButton();
    languageButton.class.styleClasses = ["header__button"];
    languageButton.matter = [string];
    return languageButton;
  })
  return asideLeft;
}

function _addAsideRight() {
  const asideRight = planElement();
  asideRight.class.tag = "aside";
  asideRight.class.styleClasses = [
    "header__aside", 
    "header__aside_type_right"
  ];
  asideRight.matter = parameters._nav.map((arrey) => {
    const languageButton = planButton();
    languageButton.class.styleClasses = ["header__button"];
    languageButton.matter = [arrey];
    return languageButton;
  })
  return asideRight;
}

function _addHeader() {
  const header = planElement();
  header.class.tag = "header";
  header.class.styleClasses = ["header"];
  header["asideLeft"] = _addAsideLeft();
  header["asideRight"] = _addAsideRight();
  return header;
}

function _addSectionNav() {
  const sectionNav = planElement();
  sectionNav.class.tag = "section";
  sectionNav.class.styleClasses = [
    "figure__section", 
    "figure__section_type_nav"
  ];
  sectionNav.matter = parameters._navRingsImg().map((arrey, i) => {
    const button = planButton();
    button.class.styleClasses = ["figure__button"];
    button.class._style = parameters._navRingStyles[i];
    button.matter = arrey.map((item, i) => {
      const image = planImage();
      const modes = [
        "figure__img_type_title", 
        "figure__img_type_shine", 
        "figure__img_type_lit"
      ];
      image.class.styleClasses = ["figure__img", `${modes[i]}`];
      image.class._src = item;
      return image;
    })
    return button;
  })
  return sectionNav;
}

function _addSectionDecor() {
  const sectionDecor = planElement();
  sectionDecor.class.tag = "section";
  sectionDecor.class.styleClasses = [
    "figure__section",
    "figure__section_type_decor"
  ];
  sectionDecor.matter = parameters._decorRingsImg().map((string, i) => {
    const image = planImage();
    image.class.styleClasses = [
      "figure__img",
      "figure__img_type_lit"
    ];
    image.class._src = string;
    image.class._style = parameters._decorRingsStyles()[i];
    return image;
  });
  return sectionDecor;
}

function _addFigure() {
  const figure = planElement();
  figure.class.tag = "figure";
  figure.class.styleClasses = ["figure"];
  figure["sectionNav"] = _addSectionNav();
  figure["sectionDecor"] = _addSectionDecor();
  return figure;
}

const plan = {
  header: _addHeader(),
  figure: _addFigure()
};

export default plan;