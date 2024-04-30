"use strict";
import parameters from "./parameters.js";
import { instruction } from "./data.js";
import { planDevice } from "../modules/Device.js";
import { planBlock } from "../modules/Block.js";
import { planElement } from "../modules/Element.js";

const planMemory = planDevice(["body"], addIndicator());
planMemory.addMatter("headerBlock", addHeader(), { headerBlock: true });
planMemory.addMatter("figureBlock", addFigure(), { figureBlock: true });
planMemory.addMatter("projectorBlock", addProjector(), { projectorBlock: true });

function addIndicator() {
  const indicator = planElement("div", ["indicator"]);
  indicator.addMatter("text", "загрузка...", { lang: 1 });
  indicator.addMatter("text", "loading...", { lang: 0 });
  return indicator;
}

function addHeader() {
  const header = planBlock("header", ["header"]);
  header.addMatter("asideLeft", addAsideLeft());
  header.addMatter("asideRight", addAsideRight());
  return header;
}
function addAsideLeft() {
  const asideLeft = planBlock("aside", [
    "header__aside", 
    "header__aside_type_left"
  ]);
  parameters._languages.forEach((string, i) => {
    const languageButton = planElement("button", ["header__button"]);
    languageButton.addMatter("text", string);
    asideLeft.addMatter("element", languageButton);
  });
  return asideLeft;
}
function addAsideRight() {
  const asideRight = planBlock("aside", [
    "header__aside", 
    "header__aside_type_right"
  ]);
  parameters._nav.forEach((arrey) => {
    const languageButton = planElement("button", ["header__button"]);
    arrey.forEach((string, i) => {
      languageButton.addMatter("text", string, { lang: i });
    })
    asideRight.addMatter("element", languageButton);
  });
  return asideRight;
}

function addFigure() {
  const figure = planBlock("figure", ["figure"]);
  figure.addMatter("sectionNav", addSectionNav());
  figure.addMatter("sectionDecor", addSectionDecor());
  return figure;
}
function addSectionNav() {
  const sectionNav = planBlock("section", [
    "figure__section", 
    "figure__section_type_nav"
  ]);
  parameters._navRingsImg().forEach((arrey, i) => {
    const button = planElement("buuton", ["figure__button"], parameters._navRingStyles[i]);
    arrey.forEach((item, i) => {
      const modes = [
        "figure__img_type_title", 
        "figure__img_type_shine", 
        "figure__img_type_lit"
      ];
      const image = planElement("img", ["figure__img", `${modes[i]}`]);
      if (Array.isArray(item)) {
        const array = item;
        array.forEach((item, i) => {
          image.addMatter("image", item, { lang: i })
        });
      } else {
        image.addMatter("image", item);
      };
      button.addMatter("element", image);
    })
    sectionNav.addMatter("element", button)
  });
  return sectionNav;
}
function addSectionDecor() {
  const sectionDecor = planElement("section", [
    "figure__section",
    "figure__section_type_decor"
  ]);
  parameters._decorRingsImg().forEach((string, i) => {
    const image = planElement("img", [
      "figure__img",
      "figure__img_type_lit"
    ], parameters._decorRingsStyles()[i]);
    image.addMatter("image", string);
    sectionDecor.addMatter("element", image);
  });
  return sectionDecor;
}

function addProjector() {
  const projector = planBlock("footer", ["footer"]);
  projector.addMatter("element", addArticle());
  projector.addMatter("element", addNames());
  return projector;
}
function addArticle() {
  const article = planElement("article", ["footer__article"]);
  instruction.forEach((lang, i) => {
    return lang.column.forEach((arrey) => {
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
      article.addMatter("element", section, { lang: i });
    })
  })
  return article;
}
function addNames() {
  const section = planElement("section", [
    "footer__section", 
    "footer__section_names"
  ]);
  instruction.forEach((lang, i) => {
    return lang.names.forEach((arrey) => {
      const name = planElement("div", ["footer__cell"]);
      arrey.forEach((string) => {
        const paragraph = planElement("p");
        paragraph.addMatter("text", string)
        name.addMatter("element", paragraph)
      })
      section.addMatter("element", name, { lang: i })
    })
  })
  return section;
}

export default planMemory;