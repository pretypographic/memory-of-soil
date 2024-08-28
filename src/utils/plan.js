"use strict";

import conf from "./conf.js";
import { main, instruction } from "../resources/source.js";
import { planDevice } from "../space/Device.js";
import { planBlock } from "../space/Block.js";
import { planElement } from "../space/Element.js";

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

const projectorPlan = planBlock("footer", ["footer", "disabled"]);
projectorPlan.addMatter("element", articlePlan(), "projector");
projectorPlan.addMatter("element", sectionPlan(), "projector");
planMemory.addFrame("projector", projectorPlan);

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
  conf._navRingsImg().forEach((arrey, i) => {
    const buttonPlan = planElement("button", ["figure__button"]);
    buttonPlan.class.styleMod = conf._navRingsStyles[i];
    arrey.forEach((plan, i) => {
      const modes = [
        "figure__img_type_title", 
        "figure__img_type_shine", 
        "figure__img_type_lit"
      ];
      const imagePlan = planElement("img", ["figure__img", `${modes[i]}`], "lang");
      imagePlan.addMatter("image", plan);
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

export default planMemory;