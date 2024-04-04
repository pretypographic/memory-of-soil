"use strict";
import images from "../media/images/images.js";
import { planBlock } from "../modules/components/Block.js";
import { planElement } from "../modules/components/Element.js";
import { planButton } from "../modules/components/Button.js";
import { planImage } from "../modules/components/Image.js";

let CURRENT_LANGUAGE = "eng";

const parameters = {
  _languages: ["eng", "rus"],
  _nav: [
    ["about", "о проекте"]
  ],
  _navRingStyles: [
    "width: 15vh; height: 15vh; top: 42vh; z-index: 9;",
    "width: 27vh; height: 27vh; top: 36vh; z-index: 8;",
    "width: 36vh; height: 36vh; top: 31.5vh; z-index: 7;",
    "width: 49vh; height: 49vh; top: 25vh; z-index: 6;",
    "width: 63vh; height: 63vh; top: 18vh; z-index: 5;",
    "width: 70vh; height: 70vh; top: 14.5vh; z-index: 4;",
    "width: 75vh; height: 75vh; top: 12vh; z-index: 3;",
    "width: 86vh; height: 86vh; top: 6.5vh; z-index: 2;",
    "width: 99vh; height: 99vh; top: 0vh; z-index: 1;"
  ],
  _navRingsImg: function () {
    const array = [];
    for (let i = 0; i <= 8; i++) {
      array.push([
        Object.values(images.title[CURRENT_LANGUAGE])[i],
        Object.values(images.lit)[i], 
        Object.values(images.shine)[i]
      ]);
    }
    return array;
  },
  _decorRingsImg: function () {
    const arrey = [];
    for (let i = 9; i <= 14; i++) {
      arrey.push(Object.values(images.shine)[i]);
    }
    return arrey;
  },
  _decorRingsStyles: function () {
    let array = [];
    for (let i = 0.2; i <= 0.8; i = i + 0.1) {
      array.push(`animation-delay: ${i}s`)
    };
    return array;
  }
};

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
    languageButton.matter = [arrey[0]];
    return languageButton;
  })
  return asideRight;
}

function _addHeader() {
  const header = planBlock();
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
    button.matter = arrey.map((string, i) => {
      const image = planImage();
      const mode = [
        "figure__img_type_title", 
        "figure__img_type_shine", 
        "figure__img_type_lit"
      ];
      image.class.styleClasses = ["figure__img", `${mode[i]}`];
      image.class._src = string;
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
  const figure = planBlock();
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