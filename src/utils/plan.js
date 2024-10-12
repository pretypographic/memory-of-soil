"use strict";

import conf from "./conf.js";
import { main, instruction, memory } from "../resources/source.js";
import { planDevice } from "../space/Device.js";
import { planBlock } from "../space/Block.js";
import { planElement } from "../space/Element.js";
import images from "../media/images/data.js";

const indicator = planElement("div", ["indicator"], "lang");
indicator.addMatter("text", main.indicator);
const planMemory = planDevice(["body"], indicator);

const headerPlan = planBlock("header", ["header"]);
headerPlan.addMatter("asideLeft", asideLeftPlan());
headerPlan.addMatter("asideRight", asideRightPlan());
planMemory.addFrame("header", headerPlan);

const figurePlan = planBlock("figure", ["figure"]);
figurePlan.addMatter("sectionNav", sectionNavPlan());
figurePlan.addMatter("sectionDecor", sectionDecorPlan());
planMemory.addFrame("figure", figurePlan);

const projectorPlan = planBlock("footer", ["footer", "disabled"], "projector");
projectorPlan.addMatter("element", articlePlan());
projectorPlan.addMatter("element", sectionPlan());
planMemory.addFrame("projector", projectorPlan);

const galaryPlan = planBlock("main", ["main"]);
galaryPlan.addMatter("visualSection", visualSectionPlan());
planMemory.addFrame("gallery", galaryPlan);

function asideLeftPlan() {
  const asideLeftPlan = planBlock("aside", [
    "header__aside", 
    "header__aside_type_left"
  ]);
  main.languages.forEach((string, i) => {
    const languageButtonPlan = planElement("button", ["header__button"]);
    languageButtonPlan.addMatter("text", string);
    asideLeftPlan.addMatter("element", languageButtonPlan);
  });
  return asideLeftPlan;
}
function asideRightPlan() {
  const asideRightPlan = planBlock("aside", [
    "header__aside", 
    "header__aside_type_right"
  ]);
  const buttonPlan = planElement("button", ["header__button"], "lang");
  buttonPlan.addMatter("text", main.about);
  asideRightPlan.addMatter("element", buttonPlan);
  return asideRightPlan;
}
function sectionNavPlan() {
  const sectionNavPlan = planBlock("section", [
    "figure__section", 
    "figure__section_type_nav"
  ]);
  conf._navRingsImg().forEach((images, i) => {
    const buttonPlan = planElement("button", ["figure__button"], "lang");
    buttonPlan.addMatter("text", Object.values(memory.title)[0]);
    buttonPlan.class.styleMod = conf._navRingsStyles[i];
    images.forEach((string, i) => {
      const modes = [
        "figure__img_type_title", 
        "figure__img_type_shine", 
        "figure__img_type_lit"
      ];
      const imagePlan = planElement("img", ["figure__img", `${modes[i]}`], "lang");
      imagePlan.addMatter("image", string);
      buttonPlan.addMatter("element", imagePlan);
    });
    sectionNavPlan.addMatter("element", buttonPlan);
  });
  return sectionNavPlan;
}
function sectionDecorPlan() {
  const sectionDecorPlan = planBlock("section", [
    "figure__section",
    "figure__section_type_decor"
  ]);
  conf._decorRingsImg().forEach((string, i) => {
    const imagePlan = planElement("img", [
      "figure__img",
      "figure__img_type_lit"
    ]);
    imagePlan.class.styleMod = conf._decorRingsStyles()[i];
    imagePlan.addMatter("image", string);
    sectionDecorPlan.addMatter("element", imagePlan);
  });
  return sectionDecorPlan;
}
function articlePlan() {
  const articlePlan = planElement("article", ["footer__article"], "lang");
  articlePlan.addMatter("columns", instruction.column);
  return articlePlan;
}
function sectionPlan() {
  const sectionPlan = planElement("section", [
    "footer__section", 
    "footer__names"
  ], "lang");
  sectionPlan.addMatter("columns", instruction.names)
  return sectionPlan;
}
function visualSectionPlan() {
  const framesTitle = Object.keys(images.frames);
  const framesImages = Object.values(images.frames);
  const visualSectionPlan = planBlock("section", [
    "main__section", 
    "main__section_side_visual"], "frame");
  let array = [];
  const modes = framesTitle.reduce((conf, string, i) => {
    return {
      ...conf,
      [string]: Object.values(framesImages[i]).map((src) => {
        const elementImagePlan = planElement("div", ["main__image-element"]);
        const imagePlan = planElement("img", ["main__image"]);
        imagePlan.addMatter("image", src);
        elementImagePlan.addMatter("element", imagePlan);
        return elementImagePlan;
      }, [])
    }
  }, {});
  array.push(modes);
  visualSectionPlan.addMatter("element", array);
  return visualSectionPlan;
}
function textSectionPlan() {
  const textSectionPlan = planBlock("section", ["main__section", "main__section_side_text"]);
  // textSectionPlan.addMatter("elements", memory.text); 
  return textSectionPlan;
}

export default planMemory;