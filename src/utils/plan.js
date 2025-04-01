"use strict";

import conf from "./conf.js";
import {
  ARTICLE_ELEMENT, 
  ASIDE_ELEMENT, 
  BUTTON_ELEMENT, 
  DIV_ELEMENT, 
  FIGURE_ELEMENT, 
  FOOTER_ELEMENT, 
  HEADER_ELEMENT, 
  IMG_ELEMENT, 
  MAIN_ELEMENT, 
  SECTION_ELEMENT, 
  SOURCE_ELEMENT, 
  TITLE_ELEMENT, 
  VIDEO_ELEMENT,
  LANG_CONF,
  FRAME_CONF,
  PROJECTOR_CONF,
  TEXT_TYPE,
  COLUMNS_TYPE,
  IMAGE_TYPE,
  ELEMENT_TYPE,
  PARAGRAPH_ELEMENT,
  AUDIO_ELEMENT
} from "./const.js";
import { styleClasses } from "./styleClasses.js";
import { main, intro, instruction, data } from "../resources/source.js";
import { planDevice } from "../space/Device.js";
import { planBlock } from "../space/Block.js";
import { planElement } from "../space/Element.js";

let popupData = {};

const indicator = planElement(DIV_ELEMENT, styleClasses.indicator, LANG_CONF);
indicator.addMatter(TEXT_TYPE, main.indicator);
const planMemory = planDevice(styleClasses.body, indicator);

const coreInterfacePlan = planBlock(DIV_ELEMENT, styleClasses.coreInterface.parent);
coreInterfacePlan.addMatter(ELEMENT_TYPE, flagPlan());
coreInterfacePlan.addMatter("screenButton", screenButtonPlan());
coreInterfacePlan.addMatter("soundButton", soundButtonPlan());
planMemory.addFrame("coreInterface", coreInterfacePlan);

const introPlan = planBlock(SECTION_ELEMENT, styleClasses.intro.parent, LANG_CONF);
introPlan.addMatter(ELEMENT_TYPE, descriptionPlan());
planMemory.addFrame("intro", introPlan);

const headerPlan = planBlock(HEADER_ELEMENT, styleClasses.header.parent);
headerPlan.addMatter("asideLeft", asideLeftPlan());
headerPlan.addMatter("asideRight", asideRightPlan());
planMemory.addFrame("header", headerPlan);

const figurePlan = planBlock(FIGURE_ELEMENT, styleClasses.figure.parent);
figurePlan.addMatter("sectionNav", sectionNavPlan());
figurePlan.addMatter("sectionDecor", sectionDecorPlan());
figurePlan.addMatter("shield", shieldPlan());
planMemory.addFrame("figure", figurePlan);

const projectorPlan = planBlock(FOOTER_ELEMENT, styleClasses.footer.parent, PROJECTOR_CONF);
projectorPlan.addMatter(ELEMENT_TYPE, setProjector());
planMemory.addFrame("projector", projectorPlan);

const gallaryPlan = planBlock(MAIN_ELEMENT, styleClasses.main.parent, FRAME_CONF);
gallaryPlan.addMatter("title", frameTitlePlan());
gallaryPlan.addMatter(ELEMENT_TYPE, formExposition());
gallaryPlan.addMatter("navButton", frameNavPlan());
planMemory.addFrame("gallery", gallaryPlan);

function flagPlan() {
  const flagPlan = planElement(DIV_ELEMENT, styleClasses.coreInterface.flag);
  const audioPlan = planElement(AUDIO_ELEMENT, styleClasses.coreInterface.audio);
  audioPlan.class.loop = "loop";
  audioPlan.class.src = main.audio;
  flagPlan.addMatter(ELEMENT_TYPE, audioPlan);
  return flagPlan;
};
function screenButtonPlan() {
  const screenButtonPlan = planBlock(BUTTON_ELEMENT, styleClasses.coreInterface.screenButton);
  const labelPlan = planElement(PARAGRAPH_ELEMENT, styleClasses.coreInterface.label, LANG_CONF);
  labelPlan.addMatter(TEXT_TYPE, main.coreInterfaceLabels.screen);
  screenButtonPlan.addMatter(ELEMENT_TYPE, labelPlan);
  return screenButtonPlan;
};
function soundButtonPlan() {
  const soundButtonPlan = planBlock(BUTTON_ELEMENT, styleClasses.coreInterface.soundButton);
  const labelPlan = planElement(PARAGRAPH_ELEMENT, styleClasses.coreInterface.label, LANG_CONF);
  labelPlan.addMatter(TEXT_TYPE, main.coreInterfaceLabels.sound);
  soundButtonPlan.addMatter(ELEMENT_TYPE, labelPlan);
  return soundButtonPlan;
};
function descriptionPlan() {  
  const description = {
    rus: descriptionElementsPlan("rus"),
    eng: descriptionElementsPlan("eng")
  }
  return [description];
};
function descriptionElementsPlan(lang) {
  const introductionPlan = planElement(PARAGRAPH_ELEMENT, styleClasses.intro.text);
  introductionPlan.addMatter(TEXT_TYPE, intro.introduction[lang]);
  const phoneImgPlan = planElement(IMG_ELEMENT, styleClasses.intro.img);
  phoneImgPlan.addMatter(IMAGE_TYPE, intro.imgSrc);
  const phoneAdvisePlan = planElement(PARAGRAPH_ELEMENT, styleClasses.intro.phoneAdviseText);
  phoneAdvisePlan.addMatter(TEXT_TYPE, intro.phoneAdvise[lang]);
  const partingWordsPlan = planElement(PARAGRAPH_ELEMENT, styleClasses.intro.text);
  partingWordsPlan.addMatter(TEXT_TYPE, intro.partingWords[lang]);
  const buttonPlan = planElement(BUTTON_ELEMENT, styleClasses.intro.button);
  buttonPlan.addMatter(TEXT_TYPE, intro.button[lang]);
  return [introductionPlan, phoneImgPlan, phoneAdvisePlan, partingWordsPlan, buttonPlan]
};
function asideLeftPlan() {
  const asideLeftPlan = planBlock(ASIDE_ELEMENT, styleClasses.header.asideLeft);
  main.languages.forEach((string, i) => {
    const languageButtonPlan = planElement(BUTTON_ELEMENT, styleClasses.header.button);
    languageButtonPlan.addMatter(TEXT_TYPE, string);
    asideLeftPlan.addMatter(ELEMENT_TYPE, languageButtonPlan);
  });
  return asideLeftPlan;
};
function asideRightPlan() {
  const asideRightPlan = planBlock(ASIDE_ELEMENT, styleClasses.header.asideRight);
  const buttonPlan = planElement(BUTTON_ELEMENT, styleClasses.header.button, LANG_CONF);
  buttonPlan.addMatter(TEXT_TYPE, main.about);
  asideRightPlan.addMatter(ELEMENT_TYPE, buttonPlan);
  return asideRightPlan;
};
function sectionNavPlan() {
  const sectionNavPlan = planBlock(SECTION_ELEMENT, styleClasses.figure.sectionNav);
  conf._navRingsImg().forEach((images, i) => {
    const buttonPlan = planElement(BUTTON_ELEMENT, styleClasses.figure.button, LANG_CONF);
    const titles = Object.keys(data).reverse();
    buttonPlan.addMatter(TEXT_TYPE, titles[i]);
    buttonPlan.class.styleMod = conf._navRingsStyles[i];
    images.forEach((string, i) => {
      const modes = styleClasses.figure.modes;
      const imagePlan = planElement(IMG_ELEMENT, [styleClasses.figure.imgNav, `${modes[i]}`], LANG_CONF);
      imagePlan.addMatter(IMAGE_TYPE, string);
      buttonPlan.addMatter(ELEMENT_TYPE, imagePlan);
    });
    sectionNavPlan.addMatter(ELEMENT_TYPE, buttonPlan);
  });
  return sectionNavPlan;
};
function sectionDecorPlan() {
  const sectionDecorPlan = planBlock(SECTION_ELEMENT, styleClasses.figure.sectionDecor);
  conf._decorRingsImg().forEach((string, i) => {
    const imagePlan = planElement(IMG_ELEMENT, styleClasses.figure.imgDecor);
    imagePlan.class.styleMod = conf._decorRingsStyles()[i];
    imagePlan.addMatter(IMAGE_TYPE, string);
    sectionDecorPlan.addMatter(ELEMENT_TYPE, imagePlan);
  });
  return sectionDecorPlan;
};
function shieldPlan() {
  const shieldPlan = planBlock(DIV_ELEMENT, styleClasses.figure.shield);
  return shieldPlan;
};
function setProjector() {
  let projectorModes = {
    about: [articlePlan(), sectionPlan()],
    image: [slideProjectorPlan(), closeButtonPlan()],
    video: [cinemaProjectorPlan(), closeButtonPlan()],
    text: [opaqueProjectorPlan(), closeButtonPlan()]
  }
  return [projectorModes];
};
function articlePlan() {
  const articlePlan = planElement(ARTICLE_ELEMENT, styleClasses.footer.article, LANG_CONF);
  const SECTION_STYLE_CLASS = "footer__section";
  articlePlan.addMatter(COLUMNS_TYPE, instruction.column, SECTION_STYLE_CLASS);
  return articlePlan;
};
function sectionPlan() {
  const sectionPlan = planElement(SECTION_ELEMENT, styleClasses.footer.section, LANG_CONF);
  const NAME_BLOCK_STYLE_CLASS = "footer__name-block";
  sectionPlan.addMatter(COLUMNS_TYPE, instruction.names, NAME_BLOCK_STYLE_CLASS)
  return sectionPlan;
};
function closeButtonPlan() {
  const closeButtonPlan = planElement(BUTTON_ELEMENT, styleClasses.footer.button);
  closeButtonPlan.addMatter(TEXT_TYPE, "+");
  return closeButtonPlan;
};
function slideProjectorPlan() {
  const screenPlan = planElement(IMG_ELEMENT, styleClasses.footer.slideProjector);
  return screenPlan;
};
function cinemaProjectorPlan() {
  const screenPlan = planElement(VIDEO_ELEMENT, styleClasses.footer.cinemaProjector);
  screenPlan.class.controls = true;
  const screenSourcePlan = planElement(SOURCE_ELEMENT, false);
  screenSourcePlan.class.type = "video/mp4";
  screenPlan.addMatter(ELEMENT_TYPE, screenSourcePlan);
  return screenPlan;
};
function opaqueProjectorPlan() {
  const screenPlan = planElement(DIV_ELEMENT, styleClasses.footer.opaqueProjector);
  return screenPlan;
};
function frameTitleCheck(item) {
  if (item.title.eng === "revelations") {
    return styleClasses.main.title_frame_revelations;
  } else {
    return styleClasses.main.title;
  }
};
function frameTitlePlan() {
  const mainTitleBlockPlan = planBlock(DIV_ELEMENT, styleClasses.main.titleBlock, FRAME_CONF);
  const dataArray = Object.values(data);
  const frameConfArray = [dataArray.reduce((acc, item) => {
    const mainTitle = planElement(TITLE_ELEMENT, frameTitleCheck(item), LANG_CONF);
    mainTitle.addMatter(TEXT_TYPE, item.title);
    return {
      ...acc,
      [item.title.eng]: [mainTitle]
    }
  }, {})];
  mainTitleBlockPlan.addMatter(ELEMENT_TYPE, frameConfArray);
  return mainTitleBlockPlan;
};
function formExposition() {
  const framesTitle = Object.keys(data);
  const exposition = framesTitle.reduce((conf, string) => {
    return {
      ...conf,
      [string]: formFrameExposition(string)
    }
  }, {});
  return [exposition];
};
function textTypeCheck(data) {
  if (data.textStyleType === "a") {
    return styleClasses.main.text;
  } else if (data.textStyleType === "b") {
    return styleClasses.main.text_type_b;
  } else if (data.textStyleType === "c") {
    return styleClasses.main.text_type_c;
  }
};
function formFrameExposition(string) {
  let array = [];
  if (data[string].video) {
    Object.values(data[string].video).map((object) => {
      const elementImagePlan = planElement(DIV_ELEMENT, styleClasses.main.imageElement);
      const imagePlan = planElement(IMG_ELEMENT, styleClasses.main.image);
      imagePlan.class.id = `v${Math.round(Math.random() * 1000000)}`;
      imagePlan.addMatter(IMAGE_TYPE, object.image);
      const videoIcnPlan = planElement(DIV_ELEMENT, styleClasses.main.videoIcn);
      elementImagePlan.addMatter(ELEMENT_TYPE, videoIcnPlan);
      elementImagePlan.addMatter(ELEMENT_TYPE, imagePlan);
      array.push(elementImagePlan);
      popupData = { ...popupData, [imagePlan.class.id]: object.video }
    });
  };
  if (data[string].images) {
    Object.values(data[string].images).map((src) => {
      const elementImagePlan = planElement(DIV_ELEMENT, styleClasses.main.imageElement);
      const imagePlan = planElement(IMG_ELEMENT, styleClasses.main.image);
      imagePlan.class.id = `i${Math.round(Math.random() * 1000000)}`;
      imagePlan.addMatter(IMAGE_TYPE, src);
      elementImagePlan.addMatter(ELEMENT_TYPE, imagePlan);
      array.push(elementImagePlan);
      popupData = { ...popupData, [imagePlan.class.id]: src }
    });
  };
  if (data[string].texts) {
    const elementTextPlan = planElement(DIV_ELEMENT, styleClasses.main.textElement, LANG_CONF);
    elementTextPlan.addMatter(COLUMNS_TYPE, data[string].texts, textTypeCheck(data[string]));
    elementTextPlan.class.id = `t${Math.round(Math.random() * 1000000)}`;
    array.push(elementTextPlan);
    popupData = { ...popupData, [elementTextPlan.class.id]: data[string].texts }
  }
  return array;
};
function frameNavPlan() {
  const headerNav = planBlock(SECTION_ELEMENT, styleClasses.main.nav);
  const headerNavButton = planElement(BUTTON_ELEMENT, styleClasses.main.navButton, LANG_CONF);
  headerNavButton.addMatter(TEXT_TYPE, main.navElement)
  headerNav.addMatter(ELEMENT_TYPE, headerNavButton);
  return headerNav;
};

export { planMemory, popupData };