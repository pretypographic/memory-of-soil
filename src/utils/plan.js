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
const TITLE_ELEMENT = "h1";
const MAIN_ELEMENT = "main";
const SECTION_ELEMENT = "section";
const ARTICLE_ELEMENT = "article";
const ASIDE_ELEMENT = "aside";
const BUTTON_ELEMENT = "button";
const IMG_ELEMENT = "img";
const VIDEO_ELEMENT = "video";
const SOURCE_ELEMENT = "source";

const LANG_CONF = "lang";
const FRAME_CONF = "frame";
const PROJECTOR_CONF = "projectorMode";

const TEXT_TYPE = "text";
const COLUMNS_TYPE = "columns";
const ARTICLE_TYPE = "article";
const IMAGE_TYPE = "image";
const ELEMENT_TYPE = "element";

const indicator = planElement(DIV_ELEMENT, ["indicator"], LANG_CONF);
indicator.addMatter(TEXT_TYPE, main.indicator);
const planMemory = planDevice(["body"], indicator);
let popupData = {};

const headerPlan = planBlock(HEADER_ELEMENT, ["header"]);
headerPlan.addMatter("asideLeft", asideLeftPlan());
headerPlan.addMatter("asideRight", asideRightPlan());
planMemory.addFrame("header", headerPlan);

const figurePlan = planBlock(FRGURE_ELEMENT, ["figure"]);
figurePlan.addMatter("sectionNav", sectionNavPlan());
figurePlan.addMatter("sectionDecor", sectionDecorPlan());
figurePlan.addMatter("shield", shieldPlan());
planMemory.addFrame("figure", figurePlan);

const projectorPlan = planBlock(FOOTER_ELEMENT, ["footer"], PROJECTOR_CONF);
projectorPlan.addMatter(ELEMENT_TYPE, setProjector());
planMemory.addFrame("projector", projectorPlan);

const gallaryPlan = planBlock(MAIN_ELEMENT, ["main"], FRAME_CONF);
gallaryPlan.addMatter("title", frameTitlePlan());
gallaryPlan.addMatter(ELEMENT_TYPE, formExposition());
gallaryPlan.addMatter("navButton", frameNavPlan());
planMemory.addFrame("gallery", gallaryPlan);

function asideLeftPlan() {
  const asideLeftPlan = planBlock(ASIDE_ELEMENT, [
    "header__aside",
    "header__aside_hide",
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
    "header__aside_hide",
    "header__aside_type_right"
  ]);
  const buttonPlan = planElement(BUTTON_ELEMENT, ["header__button"], LANG_CONF);
  buttonPlan.addMatter(TEXT_TYPE, main.about);
  asideRightPlan.addMatter(ELEMENT_TYPE, buttonPlan);
  return asideRightPlan;
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
function shieldPlan() {
  const shieldPlan = planBlock(DIV_ELEMENT, ["figure__shield"]);
  return shieldPlan;
}
function setProjector() {
  let projectorModes = {
    about: [articlePlan(), sectionPlan()],
    image: [slideProjectorPlan(), closeButtonPlan()],
    video: [cinemaProjectorPlan(), closeButtonPlan()],
    text: [opaqueProjectorPlan(), closeButtonPlan()]
  }
  return [projectorModes];
}
function articlePlan() {
  const articlePlan = planElement(ARTICLE_ELEMENT, ["footer__article"], LANG_CONF);
  articlePlan.addMatter(COLUMNS_TYPE, instruction.column, "footer__section");
  return articlePlan;
}
function sectionPlan() {
  const sectionPlan = planElement(SECTION_ELEMENT, [
    "footer__section", 
    "footer__names"
  ], LANG_CONF);
  sectionPlan.addMatter(COLUMNS_TYPE, instruction.names, "footer__name-block")
  return sectionPlan;
}
function closeButtonPlan() {
  const closeButtonPlan = planElement(BUTTON_ELEMENT, ["footer__button"]);
  closeButtonPlan.addMatter(TEXT_TYPE, "+");
  return closeButtonPlan;
}
function slideProjectorPlan() {
  const screenPlan = planElement(IMG_ELEMENT, ["slide-projector"]);
  return screenPlan;
}
function cinemaProjectorPlan() {
  const screenPlan = planElement(VIDEO_ELEMENT, ["cinema-projector"]);
  screenPlan.class.controls = true;
  const screenSourcePlan = planElement(SOURCE_ELEMENT, false);
  screenSourcePlan.class.type = "video/mp4";
  screenPlan.addMatter(ELEMENT_TYPE, screenSourcePlan);
  return screenPlan;
}
function opaqueProjectorPlan() {
  const screenPlan = planElement(DIV_ELEMENT, ["opaque-projector"]);
  return screenPlan;
}
function frameTitlePlan() {
  const mainTitleBlock = planBlock(DIV_ELEMENT, ["main__title-block"], FRAME_CONF);
  const dataArray = Object.values(data);
  const frameConfArray = [dataArray.reduce((acc, item) => {
    const mainTitle = planElement(TITLE_ELEMENT, ["main__title"], LANG_CONF);
    mainTitle.addMatter(TEXT_TYPE, item.title);
    return {
      ...acc,
      [item.title.eng]: [mainTitle]
    }
  }, {})];
  mainTitleBlock.addMatter(ELEMENT_TYPE, frameConfArray);
  return mainTitleBlock;
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
      imagePlan.class.id = `v${Math.round(Math.random() * 1000000)}`;
      imagePlan.addMatter(IMAGE_TYPE, object.image);
      elementImagePlan.addMatter(ELEMENT_TYPE, imagePlan);
      array.push(elementImagePlan);
      popupData = { ...popupData, [imagePlan.class.id]: object.video }
    });
  };
  if (data[string].images) {
    Object.values(data[string].images).map((src) => {
      const elementImagePlan = planElement(DIV_ELEMENT, ["main__image-element"]);
      const imagePlan = planElement(IMG_ELEMENT, ["main__image"]);
      imagePlan.class.id = `i${Math.round(Math.random() * 1000000)}`;
      imagePlan.addMatter(IMAGE_TYPE, src);
      elementImagePlan.addMatter(ELEMENT_TYPE, imagePlan);
      array.push(elementImagePlan);
      popupData = { ...popupData, [imagePlan.class.id]: src }
    });
  };
  if (data[string].texts) {
    const elementTextPlan = planElement(DIV_ELEMENT, ["main__text-element"], LANG_CONF);
    elementTextPlan.addMatter(COLUMNS_TYPE, data[string].texts, "main__text");
    elementTextPlan.class.id = `t${Math.round(Math.random() * 1000000)}`;
    array.push(elementTextPlan);
    popupData = { ...popupData, [elementTextPlan.class.id]: data[string].texts }
  }
  return array;
}
function frameNavPlan() {
  const headerNav = planBlock(SECTION_ELEMENT, ["main__nav"]);
  const headerNavButton = planElement(BUTTON_ELEMENT, ["main__nav-button"], LANG_CONF);
  headerNavButton.addMatter(TEXT_TYPE, main.navElement)
  headerNav.addMatter(ELEMENT_TYPE, headerNavButton);
  return headerNav;
}

export { planMemory, popupData };