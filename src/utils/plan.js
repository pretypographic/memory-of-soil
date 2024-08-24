"use strict";
import conf from "./conf.js";
import { main, instruction } from "./source.js";
import { planDevice } from "../modules/Device.js";
import { planBlock } from "../modules/Block.js";
import { planElement } from "../modules/Element.js";

console.log(conf._navRingsImg());

function addIndicatorPlan() {
  const indicator = planElement("div", ["indicator"]);
  indicator.addMatter("text", "loading...");
  indicator.addMatter("text", "загрузка...");
  return indicator;
}

const planMemory = planDevice(["body"], addIndicatorPlan());
planMemory.addFrame("header", addHeaderPlan());
planMemory.addFrame("figure", addFigurePlan());
planMemory.addFrame("projector", addProjectorPlan());

function addHeaderPlan() {
  const headerPlan = planBlock("header", ["header"]);
  headerPlan.addMatter("asideLeft", addAsideLeftPlan());
  headerPlan.addMatter("asideRight", addAsideRightPlan());
  return headerPlan;
}
function addAsideLeftPlan() { 
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
function addAsideRightPlan() {
  const asideRightPlan = planBlock("aside", [
    "header__aside", 
    "header__aside_type_right"
  ]);
  const aboutButtonPlan = planElement("button", ["header__button"]);
  aboutButtonPlan.addMatter("text", main.about.eng[0]);
  asideRightPlan.addMatter("element", aboutButtonPlan);
  return asideRightPlan;
}

function addFigurePlan() {
  const figurePlan = planBlock("figure", ["figure"]);
  figurePlan.addMatter("sectionNav", addSectionNavPlan());
  figurePlan.addMatter("sectionDecor", addSectionDecorPlan());
  return figurePlan;
}
function addSectionNavPlan() {
  const sectionNavPlan = planBlock("section", [
    "figure__section", 
    "figure__section_type_nav"
  ]);
  conf._navRingsImg().forEach((arrey, i) => {
    const buttonPlan = planElement("button", ["figure__button"]);
    buttonPlan.class.styleMod = conf._navRingsStyles[i];
    arrey.forEach((item, i) => {
      const modes = [
        "figure__img_type_title", 
        "figure__img_type_shine", 
        "figure__img_type_lit"
      ];
      const imagePlan = planElement("img", ["figure__img", `${modes[i]}`]);
      if (Array.isArray(item)) {
        const array = item;
        array.forEach((item, i) => {
          imagePlan.addMatter("image", item)
        });
      } else {
        imagePlan.addMatter("image", item);
      };
      buttonPlan.addMatter("element", imagePlan);
    })
    sectionNavPlan.addMatter("element", buttonPlan)
  });
  return sectionNavPlan;
}
function addSectionDecorPlan() {
  const sectionDecor = planBlock("section", [
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
    sectionDecor.addMatter("element", imagePlan);
  });
  return sectionDecor;
}

function addProjectorPlan() {
  const projector = planBlock("footer", ["footer", "disabled"]);
  projector.addMatter("element", addArticlePlan());
  projector.addMatter("element", addNamesPlan());
  return projector;
}
function addArticlePlan() {
  const article = planElement("article", ["footer__article"]);
  instruction.column.eng.forEach((arrey) => {
    const section = planElement("section", ["footer__section"]);
    arrey.forEach((string, i) => {
      if (i === 0) {
        const title = planElement("h2");
        title.addMatter("text", string);
        section.addMatter("element", title);
      } else {
        const paragraph = planElement("p");
        paragraph.addMatter("text", string)
        section.addMatter("element", paragraph);
      }
    })
    article.addMatter("element", section);
  })
  return article;
}
function addNamesPlan() {
  const section = planElement("section", [
    "footer__section", 
    "footer__section_names"
  ]);
  instruction.names.eng.forEach((arrey) => {
    const name = planElement("div", ["footer__cell"]);
    arrey.forEach((string) => {
      const paragraph = planElement("p");
      paragraph.addMatter("text", string)
      name.addMatter("element", paragraph)
    })
    section.addMatter("element", name)
  })
  return section;
}

export default planMemory;