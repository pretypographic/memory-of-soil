"use strict";
import parameters from "./parameters.js";
import { instruction } from "./data.js";
import { planLoader } from "../modules/Loader.js";
import { planElement } from "../modules/Element.js";
import { planButton } from "../modules/Button.js";
import { planImage } from "../modules/Image.js";
import { planAticle } from "../modules/Article.js";
import { planSection } from "../modules/Section.js";

const plan = createPlan();

function createPlan() {
  return {
    loader: _addLoader(),
    header: _addHeader(),
    figure: _addFigure(),
    projector: _addProjector()
  }
}

function _addLoader() {
  const loader = planLoader();
  loader.class.tag = "div";
  loader.class.styleClasses = "loader";
  loader.matter.push(["loading...", "загрузка..."]);
  return loader;
}
function _addHeader() {
  const header = planElement();
  header.class.tag = "header";
  header.class.styleClasses = ["header"];
  header["asideLeft"] = _addAsideLeft();
  header["asideRight"] = _addAsideRight();
  return header;
}
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
  });
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
  });
  return asideRight;
}
function _addFigure() {
  const figure = planElement();
  figure.class.tag = "figure";
  figure.class.styleClasses = ["figure"];
  figure.class.mods.off = "figure_state_off";
  figure["sectionNav"] = _addSectionNav();
  figure["sectionDecor"] = _addSectionDecor();
  return figure;
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
  });
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
function _addProjector() {
  const projector = planElement();
  projector.class.tag = "footer";
  projector.class.styleClasses = ["footer"];
  projector["article"] = _addArticle();
  projector["names"] = _addNames();
  return projector;
}
function _addArticle() {
  const article = planAticle();
  article.class.styleClasses = ["footer__article"];
  article.matter = instruction.map((lang) => {
    return lang.column.map((arrey) => {
      const section = planSection();
      section.class.styleClasses = ["footer__section"];
      section.matter = arrey;
      return section;
    })
  })
  return article;
}
function _addNames() {
  const names = planElement();
  names.class.tag = "section";
  names.class.styleClasses = ["footer__section", "footer__section_names"]
  names.matter = instruction.map((lang) => {
    return lang.names.map((arrey) => {
      const section = planAticle();
      section.class.tag = "div";
      section.class.styleClasses = ["footer__cell"];
      section.matter = arrey;
      return section;
    })
  })
  return names;
}

export default plan;