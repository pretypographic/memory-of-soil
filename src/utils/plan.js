"use strict";

import conf from "./conf.js";
import { main, instruction, data } from "../resources/source.js";
import { planDevice } from "../space/Device.js";
import { planBlock } from "../space/Block.js";
import { planElement } from "../space/Element.js";

const DIV_ELEMENT = "div";
const HEADER_ELEMENT = "header";
const FRGURE_ELEMENT = "figure";
const FOOTER_ELEMENT = "footer";
const MAIN_ELEMENT = "main";
const SECTION_ELEMENT = "section";
const ARTICLE_ELEMENT = "article";
const ASIDE_ELEMENT = "aside";
const BUTTON_ELEMENT = "button";
const IMG_ELEMENT = "img";

const LANG_CONF = "lang";
const FRAME_CONF = "frame";
const PROJECTOR_CONF = "projector";

const TEXT_TYPE = "text";
const COLUMNS_TYPE = "columns";
const IMAGE_TYPE = "image";
const ELEMENT_TYPE= "element";

const indicator = planElement(DIV_ELEMENT, ["indicator"], LANG_CONF);
indicator.addMatter(TEXT_TYPE, main.indicator);
const planMemory = planDevice(["body"], indicator);

const headerPlan = planBlock(HEADER_ELEMENT, ["header"]);
headerPlan.addMatter("asideLeft", asideLeftPlan());
headerPlan.addMatter("asideRight", asideRightPlan());
headerPlan.addMatter(ELEMENT_TYPE, headerNavButtonPlan());
planMemory.addFrame("header", headerPlan);

const figurePlan = planBlock(FRGURE_ELEMENT, ["figure"]);
figurePlan.addMatter("sectionNav", sectionNavPlan());
figurePlan.addMatter("sectionDecor", sectionDecorPlan());
planMemory.addFrame("figure", figurePlan);

const projectorPlan = planBlock(FOOTER_ELEMENT, ["footer", "disabled"], PROJECTOR_CONF);
projectorPlan.addMatter(ELEMENT_TYPE, articlePlan());
projectorPlan.addMatter(ELEMENT_TYPE, sectionPlan());
planMemory.addFrame("projector", projectorPlan);

const gallaryPlan = planBlock(MAIN_ELEMENT, ["main"], FRAME_CONF);
gallaryPlan.addMatter(ELEMENT_TYPE, formExposition());
planMemory.addFrame("gallery", gallaryPlan);

function asideLeftPlan() {
  const asideLeftPlan = planBlock(ASIDE_ELEMENT, [
    "header__aside", 
    "header__aside_type_left"
  ]);
  main.languages.forEach((string, i) => {
    const languageButtonPlan = planElement(BUTTON_ELEMENT, ["header__button"]);
    languageButtonPlan.addMatter(TEXT_TYPE, string);
    asideLeftPlan.addMatter(ELEMENT_TYPE, languageButtonPlan);
  });
  return asideLeftPlan;
}
function asideRightPlan() {
  const asideRightPlan = planBlock(ASIDE_ELEMENT, [
    "header__aside", 
    "header__aside_type_right"
  ]);
  const buttonPlan = planElement(BUTTON_ELEMENT, ["header__button"], LANG_CONF);
  buttonPlan.addMatter(TEXT_TYPE, main.about);
  asideRightPlan.addMatter(ELEMENT_TYPE, buttonPlan);
  return asideRightPlan;
}
function headerNavButtonPlan() {
  const headerNavButton = planElement(BUTTON_ELEMENT, ["header__nav-button", "disabled"], LANG_CONF);
  headerNavButton.addMatter(TEXT_TYPE, main.navElement)
  return headerNavButton;
}
function sectionNavPlan() {
  const sectionNavPlan = planBlock(SECTION_ELEMENT, [
    "figure__section", 
    "figure__section_type_nav"
  ]);
  conf._navRingsImg().forEach((images, i) => {
    const buttonPlan = planElement(BUTTON_ELEMENT, ["figure__button"], LANG_CONF);
    const titles = Object.keys(data).reverse();
    buttonPlan.addMatter(TEXT_TYPE, titles[i]);
    buttonPlan.class.styleMod = conf._navRingsStyles[i];
    images.forEach((string, i) => {
      const modes = [
        "figure__img_type_title", 
        "figure__img_type_shine", 
        "figure__img_type_lit"
      ];
      const imagePlan = planElement(IMG_ELEMENT, ["figure__img", `${modes[i]}`], LANG_CONF);
      imagePlan.addMatter(IMAGE_TYPE, string);
      buttonPlan.addMatter(ELEMENT_TYPE, imagePlan);
    });
    sectionNavPlan.addMatter(ELEMENT_TYPE, buttonPlan);
  });
  return sectionNavPlan;
}
function sectionDecorPlan() {
  const sectionDecorPlan = planBlock(SECTION_ELEMENT, [
    "figure__section",
    "figure__section_type_decor"
  ]);
  conf._decorRingsImg().forEach((string, i) => {
    const imagePlan = planElement(IMG_ELEMENT, [
      "figure__img",
      "figure__img_type_lit"
    ]);
    imagePlan.class.styleMod = conf._decorRingsStyles()[i];
    imagePlan.addMatter(IMAGE_TYPE, string);
    sectionDecorPlan.addMatter(ELEMENT_TYPE, imagePlan);
  });
  return sectionDecorPlan;
}
function articlePlan() {
  const articlePlan = planElement(ARTICLE_ELEMENT, ["footer__article"], LANG_CONF);
  articlePlan.addMatter(COLUMNS_TYPE, instruction.column);
  return articlePlan;
}
function sectionPlan() {
  const sectionPlan = planElement(SECTION_ELEMENT, [
    "footer__section", 
    "footer__names"
  ], LANG_CONF);
  sectionPlan.addMatter(COLUMNS_TYPE, instruction.names)
  return sectionPlan;
}
function formExposition() {
  const framesTitle = Object.keys(data);
  const exposition = framesTitle.reduce((conf, string) => {
    return {
      ...conf,
      [string]: formFrameExposition(string)
    }
  }, {});
  return [exposition];
}
function formFrameExposition(string) {
  let array = [];
  if (data[string].video) {
    Object.values(data[string].video).map((object) => {
      const elementImagePlan = planElement(DIV_ELEMENT, ["main__image-element"]);
      const imagePlan = planElement(IMG_ELEMENT, ["main__image"]);
      imagePlan.addMatter(IMAGE_TYPE, object.image);
      elementImagePlan.addMatter(ELEMENT_TYPE, imagePlan);
      array.push(elementImagePlan);
    });
  };
  if (data[string].images) {
    Object.values(data[string].images).map((src) => {
      const elementImagePlan = planElement(DIV_ELEMENT, ["main__image-element"]);
      const imagePlan = planElement(IMG_ELEMENT, ["main__image"]);
      imagePlan.addMatter(IMAGE_TYPE, src);
      elementImagePlan.addMatter(ELEMENT_TYPE, imagePlan);
      array.push(elementImagePlan);
    });
  };
  // как будет работать попап?
  return array;
}

export default planMemory;