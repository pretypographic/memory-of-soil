"use strict";

import "./index.css";
import conf from "./utils/conf.js";
import planMemory from "./utils/plan.js";
import { Device } from "./modules/Device.js";

const Memory = new Device({
  conf: conf,
  plan: planMemory
});
Memory.initiate();

const { header, figure, projector } = Memory;
header.asideLeft.plan.addProcessor("click", function (event) {
  if (event.target.textContent === "eng") {
    const button = event.target;
    button.classList.toggle("header__button_active");
    button.nextElementSibling.classList.toggle("header__button_active");
  } else if (event.target.textContent === "rus") {
    const button = event.target;
    button.classList.toggle("header__button_active");
    button.previousElementSibling.classList.toggle("header__button_active");
  }
});
header.asideRight.plan.addProcessor("click", function (event) {
  // event.target.textContent = "кольца";
  projector.toggleClass("disabled");
  figure.toggleClass("figure_state_off");
});
figure.sectionNav.plan.addProcessor("mouseover", function (event) {
  if (event.target.classList.contains("figure__button")) {
    const button = event.target;
    button.classList.add("figure__button_focused");
    figure.sectionDecor.toggleClass("figure__section_lightOn");
  }
});
figure.sectionNav.plan.addProcessor("mouseout", function (event) {
  if (event.target.classList.contains("figure__button")) {
    const button = event.target;
    button.classList.remove("figure__button_focused");
    figure.sectionDecor.toggleClass("figure__section_lightOn");
  }
});

Memory.lock([header.create(), figure.create(), projector.create()]);

console.log(Memory);
