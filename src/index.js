"use strict";

import "./index.css";
import conf from "./utils/conf.js";
import planMemory from "./utils/plan.js";
import { Device } from "./space/Device.js";

const Memory = new Device({
  conf: conf,
  plan: planMemory
});
Memory.initiate();

const { header, figure, projector } = Memory;
header.asideLeft.plan.addProcessor("click", function () {
  switchLanguages();
});
header.asideRight.plan.addProcessor("click", function () {
  updateConf();
  reverseLabel();
  toggleInstruction();
});
figure.sectionNav.plan.addProcessor("mouseover", function () {
  triggerShining();
});
figure.sectionNav.plan.addProcessor("mouseout", function () {
  quitShining();
});
function switchLanguages() {
  if (event.target.textContent === "eng") {
    const button = event.target;
    conf.current.lang = "eng";
    button.classList.toggle("header__button_active");
    button.nextElementSibling.classList.toggle("header__button_active");
  } else if (event.target.textContent === "rus") {
    const button = event.target;
    conf.current.lang = "rus";
    button.classList.toggle("header__button_active");
    button.previousElementSibling.classList.toggle("header__button_active");
  }
  update();
}
function updateConf() {  
  if (conf.current.projector === "about") {
    conf.current.projector = false;
  } else if (conf.current.projector === false) {
    conf.current.projector = "about";
  }
}
function reverseLabel() {
  if (conf.current.lang === "eng") {
    if (event.target.textContent === "rings") {
      event.target.textContent = "about";
    } else if (event.target.textContent === "about") {
      event.target.textContent = "rings";
    }
  } else if (conf.current.lang === "rus") {
    if (event.target.textContent === "кольца") {
      event.target.textContent = "о проекте";
    } else if (event.target.textContent === "о проекте") {
      event.target.textContent = "кольца";
    }
  };
}
function toggleInstruction() {
  projector.toggleClass("disabled");
  figure.toggleClass("figure_state_off");
}
function triggerShining() {
  if (event.target.classList.contains("figure__button")) {
    const button = event.target;
    button.classList.add("figure__button_focused");
    figure.sectionDecor.toggleClass("figure__section_lightOn");
  }
}
function quitShining() {
  if (event.target.classList.contains("figure__button")) {
    const button = event.target;
    button.classList.remove("figure__button_focused");
    figure.sectionDecor.toggleClass("figure__section_lightOn");
  }
}
function languageCheck() {
  const matter = header.asideLeft.matter();
  const engButton = matter.find((element) => {
    return element.textContent === "eng";
  });
  const rusButton = matter.find((element) => {
    return element.textContent === "rus";
  });
  if (conf.current.lang === "eng") {
    engButton.classList.add("header__button_active");
  } else if (conf.current.lang === "rus") {
    rusButton.classList.add("header__button_active");
  }
}
function openMainFrame() {
  Promise.resolve(Memory.lock([header.create(), figure.create(), projector.create()]))
    .then(() => {
      conf.current.frame = "main";
      languageCheck();
      if (conf.current.projector === "about") {
        toggleInstruction();
      }
    })
};
function removeMainFrame() {
  Memory.remove([header, figure, projector]);
}
function update() {
  if (conf.current.frame === "main") {
    removeMainFrame();
    openMainFrame();
  }
}

openMainFrame();
console.log(Memory);
