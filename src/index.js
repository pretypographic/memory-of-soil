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
console.log(Memory);

const { header, figure, projector, gallery } = Memory;
header.asideLeft.plan.addProcessor("click", () => {
  switchLanguages();
  update();
});
header.asideRight.plan.addProcessor("click", () => {
  updateConf();
  reverseLabel();
  toggleInstruction();
});
figure.sectionNav.plan.addProcessor("mouseover", () => {
  triggerShining();
});
figure.sectionNav.plan.addProcessor("mouseout", () => {
  quitShining();
});
figure.sectionNav.plan.addProcessor("click", () => {
  removeMainFrame();
  openMemoryFrame();
});
gallery.plan.addProcessor("mouseover", () => {
  lookIn();
});
gallery.plan.addProcessor("mouseout", () => {
  lookOut();
});
gallery.plan.addProcessor("click", () => {
  openWide();
  // открыть попап
});
// document.addEventListener("mousemove", () => {
//   handleMouseMove();
// })
// function handleMouseMove() {
//   let X = event.screenX / window.screen.width * 100;
//   let Y = event.screenY / window.screen.height * 100;
//   let shiftX;
//   let shiftY;
//   if (X > 50) {
//     shiftX = `${-(X - 50)}px`;
//   } else {
//     shiftX = `${50 - X}px`;
//   };
//   if (Y > 50) {
//     shiftY = `${-(Y - 50)}px`;
//   } else {
//     shiftY = `${50 - Y}px`;
//   };
//   const styleMod = `top: calc(${shiftY} / 6); left: calc(50% + ${shiftX} / 6);`;
//   figure.block.style = styleMod;
// };
function switchLanguages() {
  if (event.target.textContent === "eng") {
    conf.current.lang = "eng";
  } else if (event.target.textContent === "rus") {
    conf.current.lang = "rus";
  };
}
function updateConf() {  
  conf.current.projectorMode = "about";
  conf.current.projectorOpened = !conf.current.projectorOpened;
}
function reverseLabel() {
  if (conf.current.lang === "eng") {
    if (event.target.textContent === "rings") {
      console.log(event.target.textContent);
      event.target.textContent = "about";
    } else if (event.target.textContent === "about") {
      console.log(event.target.textContent);
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
  Promise.resolve()
    .then(() => {
      Memory.lock([header.create(), figure.create(), projector.create()]);
    })
    .then(() => {
      conf.current.frame = "main";
      languageCheck();
      if (conf.current.projectorOpened) {
        toggleInstruction();
        reverseLabel();
      }
    })
};
function removeMainFrame() {
  Memory.remove([header, figure, projector]);
};
function openMemoryFrame() {
  Promise.resolve()
    .then(() => {
      if (conf.current.frame === "main") {
        conf.current.frame = event.target.textContent;
      }
    })
    .then(() => {
      Memory.lock([header.create(), gallery.create(), projector.create()]);
    })
    .then(() => {
      conf.current.frame = "memory";
      header.asideRight.toggleClass("disabled");
      languageCheck();
      if (conf.current.projectorOpened) {
        toggleProjector();
      }
    })
};
function removeMemoryFrame() {
  Memory.remove([header, gallery, projector]);
}
function lookIn() {
  const imageElement = event.target.parentElement;
  if (!imageElement.classList.contains("main__image-element_opened")) {
    imageElement.classList.add("main__image-element_touched");
  }
};
function lookOut() {
  const imageElement = event.target.parentElement;
  if (!imageElement.classList.contains("main__image-element_opened")) {
    imageElement.classList.remove("main__image-element_touched");
  }
};
function openWide() {
  const imageElement = event.target.parentElement;
  imageElement.classList.remove("main__image-element_touched");
  imageElement.classList.add("main__image-element_opened");
  projector.toggleClass("disabled");
};
function update() {
  if (conf.current.frame === "main") {
    removeMainFrame();
    openMainFrame();
  } else {
    removeMemoryFrame();
    openMemoryFrame();
  }
};

openMainFrame();
