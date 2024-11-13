"use strict";

import "./index.css";
import conf from "./utils/conf.js";
import { planMemory, popupData } from "./utils/plan.js";
import { Device } from "./space/Device.js";

const Memory = new Device({
  conf: conf,
  plan: planMemory
});
Memory.initiate();
console.log(Memory);

const { header, figure, projector, gallery } = Memory;
header.asideLeft.plan.addProcessor("click", () => {
  switchLanguagesConf();
  update();
});
header.asideRight.plan.addProcessor("click", () => {
  switchAboutConf();
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
  switchFrameConf();
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
  switchProjectorConf();
  updateProjector();
  openWide();
});
gallery.navButton.plan.addProcessor("click", () => {
  conf.current.frame = "main";
  removeMemoryFrame();
  openMainFrame();
})
projector.plan.addProcessor("click", () => {
  if (conf.current.projectorMode !== "about") {
    conf.current.projectorMode = "about";
    conf.current.projectorOpened = false;
    gaveAway();
    updateProjector();
  }
})
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

function switchLanguagesConf() {
  if (event.target.textContent === "eng") {
    conf.current.lang = "eng";
  } else if (event.target.textContent === "rus") {
    conf.current.lang = "rus";
  };
}
function switchAboutConf() {
  conf.current.projectorMode = "about";
  conf.current.projectorOpened = !conf.current.projectorOpened;
}
function switchProjectorConf() {
  const image = event.target;
  const imageFrameElement = image.parentElement;
  const imageID = image.getAttribute("id");
  conf.memory.imageID = imageID;
  conf.memory.imageElement = imageFrameElement;
  
  let projectorMode = undefined;
  if (imageID.startsWith("i")) {
    projectorMode = "image"
  } else if (imageID.startsWith("v")) {
    projectorMode = "video";
  } else if (imageID.startsWith("t")) {
    projectorMode = "text";
  }
  conf.current.projectorMode = projectorMode;
  return imageID;
}
function switchFrameConf() {
  if (conf.current.frame === "main") {
    conf.current.frame = event.target.textContent;
  }
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
  projector.toggleClass("footer_opened");
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
function setLanguageButtons() {
  const matter = header.asideLeft.matter();
  const engButton = matter.find((element) => {
    return element.textContent === "eng";
  });
  const rusButton = matter.find((element) => {
    return element.textContent === "rus";
  });
  requestAnimationFrame(() => {
    if (conf.current.lang === "eng") {
      engButton.classList.add("header__button_active");
    } else if (conf.current.lang === "rus") {
      rusButton.classList.add("header__button_active");
    }
  });
}
function openMainFrame() {
  Memory.lock([header.create(), figure.create(), projector.create()]);
  // header.navButton.toggleClass("main__nav-button_hidden");
  setLanguageButtons();
  if (conf.current.projectorOpened) {
    projector.toggleClass("footer_opened");
    reverseLabel();
  }
};
function removeMainFrame() {
  Memory.remove([header, figure, projector]);
};
function openMemoryFrame() {
  Memory.lock([header.create(), gallery.create(), projector.create()]);
  header.asideRight.toggleClass("disabled");
  setLanguageButtons();
  if (conf.current.projectorOpened) {
    projector.toggleClass("footer_opened");
  }

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
  const lens = projector.matter()[0];
  lens.setAttribute("src", popupData[conf.memory.imageID]);
  conf.memory.imageElement.classList.remove("main__image-element_touched");
  conf.memory.imageElement.classList.add("main__image-element_opened");
  gallery.title.toggleClass("main__title_hidden");
  gallery.navButton.toggleClass("main__nav-button_hidden");
  projector.toggleClass("footer_projector");
};
function gaveAway() {
  conf.memory.imageElement.classList.remove("main__image-element_opened");
  gallery.title.toggleClass("main__title_hidden");
  gallery.navButton.toggleClass("main__nav-button_hidden");
  projector.toggleClass("footer_projector");
}

function update() {
  if (conf.current.frame === "main") {
    removeMainFrame();
    openMainFrame();
  } else {
    removeMemoryFrame();
    openMemoryFrame();
  }
};
function updateProjector() {
  Memory.remove([projector]);
  Memory.lock([projector.create()]);
} 

openMainFrame();
