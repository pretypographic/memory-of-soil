"use strict";

import "./index.css";
import conf from "./utils/conf.js";
import { planMemory, popupData } from "./utils/plan.js";
import { Device } from "./space/Device.js";
import { styleClasses } from "./utils/styleClasses.js";
import { main, data } from "./resources/source.js";

const LOAD_TIME_0 = 2700;
const LOAD_TIME_1 = 500;

const Memory = new Device({
  conf: conf,
  plan: planMemory
});
Memory.initiate();

const { coreInterface, intro, header, figure, projector, gallery } = Memory;
document.addEventListener('keydown', (event) => {
  if (event.code === 'KeyM') {
    switchSound();
  } else if (event.code === 'KeyF') {
    toggleFullScreen();
  }
});
intro.plan.addProcessor("click", () => {
  if (event.target.classList.contains(styleClasses.intro.button)) {
    switchFrameConf();
    header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
    intro.toggleClass(styleClasses.intro.parent_hidden);
    setTimeout(() => {
      startProgram(); 
    }, LOAD_TIME_1);
  }
});
coreInterface.screenButton.plan.addProcessor("click", () => {
  toggleFullScreen();
});
coreInterface.soundButton.plan.addProcessor("click", () => {
  switchSound();
});
header.asideLeft.plan.addProcessor("click", () => {
  if (event.target.classList.contains(styleClasses.header.button)) {
    if (conf.current.frame === "intro") {
      if (!event.target.classList.contains(styleClasses.header.button_active)) {
        switchLanguagesConf();
        updateIntro();
      }
    } else {
      if (!event.target.classList.contains(styleClasses.header.button_active)) {
        switchLanguagesConf();
        update();
      }
    }
  }
});
header.asideRight.plan.addProcessor("click", () => {
  switchAboutConf();
  toggleLabel();
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
  collapseMemory();
  setTimeout(() => {
    removeMainFrame();
    openMemoryFrame();
  }, LOAD_TIME_0)
});
gallery.plan.addProcessor("mouseover", () => {
  if (event.target.parentElement.classList.contains(styleClasses.main.text)) {
    lookInTexts();
  } else if (event.target.classList.contains(styleClasses.main.text)) {
    lookInTexts();
  } else if (event.target.classList.contains(styleClasses.main.titleBlock)) {
    return;
  } else if (event.target.classList.contains(styleClasses.main.title)) {
    return;
  } else if (event.target.classList.contains(styleClasses.main.navButton)) {
    return;
  } else if (event.target.classList.contains(styleClasses.main.videoIcn)) {
    lookInImage();
  } else {
    lookInImage();
  }
});
gallery.plan.addProcessor("mouseout", () => {
  if (event.target.parentElement.classList.contains(styleClasses.main.text)) {
    lookOutTexts();
  } else if (event.target.classList.contains(styleClasses.main.text)) {
    lookOutTexts();
  } else if (event.target.classList.contains(styleClasses.main.titleBlock)) {
    return;
  } else {
    lookOutImage();
  }
});
gallery.plan.addProcessor("click", () => {
  if (event.target.classList.contains(styleClasses.main.image)) {
    switchProjectorConfImage();
    updateProjector();
    openWide();
  } else if (event.target.parentElement.classList.contains(styleClasses.main.text)) {
    switchProjectorConfText();
    updateProjector();
    readText();
  } else if (event.target.classList.contains(styleClasses.main.text)) {
    switchProjectorConfText();
    updateProjector();
    readText();
  } else {
    return;
  }
});
gallery.navButton.plan.addProcessor("click", () => {
  conf.current.frame = "main";
  removeMemoryFrame();
  openMainFrame();
  header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
  header.asideRight.toggleClass(styleClasses.header.aside_hidden);
  setTimeout(() => {
    figure.shield.toggleClass(styleClasses.figure.shield_hidden);
  }, LOAD_TIME_1)
});
projector.plan.addProcessor("click", () => {
  if (conf.current.projectorMode === "video") {
    if (conf.current.sound === "on") {
      pauseSound();
    }
    if (!event.target.classList.contains(styleClasses.footer.cinemaProjector)) {
      gaveAway();
      if (conf.current.sound === "on") {
        playSound();
      };
      conf.current.projectorMode = "about";
      conf.current.projectorOpened = false;
      updateProjector();
    } else {
      return;
    }
  } else if (conf.current.projectorMode !== "about") {
    gaveAway();
    conf.current.projectorMode = "about";
    conf.current.projectorOpened = false;
    updateProjector();
  } else {
    return;
  }
});

function playSound() {
  coreInterface.matter()[0].firstElementChild.play()
};
function pauseSound() {
  coreInterface.matter()[0].firstElementChild.pause()
};
function switchSound() {
  if (conf.current.sound === "hold") {
    conf.current.sound = "on";
    playSound();
    coreInterface.soundButton.toggleClass(styleClasses.coreInterface.button_pressed);
    setTimeout(() => {
      coreInterface.soundButton.toggleClass(styleClasses.coreInterface.button_pressed);
    }, 500)
  } else if (conf.current.sound === "on") {
    conf.current.sound = "off";
    pauseSound();
    coreInterface.soundButton.toggleClass(styleClasses.coreInterface.button_pressed);
  } else if (conf.current.sound === "off") {
    conf.current.sound = "on";
    playSound();
    coreInterface.soundButton.toggleClass(styleClasses.coreInterface.button_pressed);
  }
};
function setSoundSource() {
  const sound = data[conf.current.frame].sound;
  coreInterface.matter()[0].firstElementChild.setAttribute("src", sound);
};
function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullScreen;

  if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  } else {
    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitCancelFullScreen) {
      doc.webkitCancelFullScreen();
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
  }
  coreInterface.screenButton.toggleClass(styleClasses.coreInterface.button_pressed);
};
function switchLanguagesConf() {
  if (event.target.textContent === "eng") {
    conf.current.lang = "eng";
  } else if (event.target.textContent === "rus") {
    conf.current.lang = "rus";
  };
};
function switchAboutConf() {
  conf.current.projectorMode = "about";
  conf.current.projectorOpened = !conf.current.projectorOpened;
};
function switchProjectorConfImage() {
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
};
function switchProjectorConfText() {
  let text = {};
  let textID = undefined;
  let textElement = {};
  let textElementID = undefined;
  if (event.target.classList.contains(styleClasses.main.text)) {
    text = event.target;
    textID = text.getAttribute("id");
    textElement = text.parentElement;
    textElementID = textElement.getAttribute("id");
  } else if (event.target.parentElement.classList.contains(styleClasses.main.text)) {
    text = event.target.parentElement;
    textID = text.getAttribute("id");
    textElement = text.parentElement;
    textElementID = textElement.getAttribute("id");
  }
  conf.memory.textID = textID;
  conf.memory.textElementID = textElementID;
  conf.memory.textElement = textElement;
  
  let projectorMode = undefined;
  if (textElementID.startsWith("i")) {
    projectorMode = "image"
    conf.current.projectorOpened = true;
  } else if (textElementID.startsWith("v")) {
    projectorMode = "video";
    conf.current.projectorOpened = true;
  } else if (textElementID.startsWith("t")) {
    projectorMode = "text";
    conf.current.projectorOpened = true;
  }
  conf.current.projectorMode = projectorMode;
  return textElementID;
};
function switchFrameConf() {
  console.log(conf.current.frame);
  if (conf.current.frame === "main") {
    conf.current.frame = event.target.textContent;
  } else {
    conf.current.frame = "main";
  };
};

function blastMemory() {
  let sectionNavButtons = figure.sectionNav.matter();
  let sectionDecorLit = figure.sectionDecor.matter();
  let step = 0;
  sectionNavButtons.forEach((element) => {
    const animationDeleyStyle = `${0 + step}s`;
    const sectionNavLit = Array.from(element.children)[2];
    sectionNavLit.style = `animation-delay: ${animationDeleyStyle}`;
    step += 0.05;
  })
  sectionDecorLit.forEach((element) => {
    const animationDeleyStyle = `${0 + step}s`;
    element.style = `animation-delay: ${animationDeleyStyle}`;
    step += 0.05;
  })
  figure.sectionNav.toggleClass(styleClasses.figure.section_blast);
  figure.sectionDecor.toggleClass(styleClasses.figure.section_blast);
  setTimeout(() => {
    step = 0.2;
    header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
    header.asideRight.toggleClass(styleClasses.header.aside_hidden);
    figure.sectionNav.toggleClass(styleClasses.figure.section_blast);
    figure.sectionDecor.toggleClass(styleClasses.figure.section_blast);
    figure.shield.toggleClass(styleClasses.figure.shield_hidden);
    sectionDecorLit.forEach((element) => {
      const animationDeleyStyle = `${0 + step}s`;
      element.style = `animation-delay: ${animationDeleyStyle}`;
      step += 0.1;
    })
  }, LOAD_TIME_0);
};
function collapseMemory() {
  let sectionDecorLit = figure.sectionDecor.matter().reverse();
  let sectionNavButtons = figure.sectionNav.matter().reverse();
  let step = 0;
  sectionDecorLit.forEach((element) => {
    const animationDeleyStyle = `${0 + step}s`;
    element.style = `animation-delay: ${animationDeleyStyle}`;
    step += 0.07;
  });
  sectionNavButtons.forEach((element) => {
    const animationDeleyStyle = `${0 + step}s`;
    const sectionNavLit = Array.from(element.children)[2];
    sectionNavLit.style = `animation-delay: ${animationDeleyStyle}`;
    step += 0.07;
  });
  figure.block.style = `background: rgba(0, 0, 0, 0)`;
  header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
  header.asideRight.toggleClass(styleClasses.header.aside_hidden);
  figure.shield.toggleClass(styleClasses.figure.shield_hidden);
  setTimeout(() => {
    figure.sectionNav.toggleClass(styleClasses.figure.section_blast);
    figure.sectionDecor.toggleClass(styleClasses.figure.section_blast);
  }, 100);
};
function toggleLabel() {
  const currentLang = conf.current.lang;
  const button = header.asideRight.matter()[0];
  const label = button.textContent;

  if (currentLang === "eng") {
    button.textContent = label === main.rings.eng ? main.about.eng : main.rings.eng;
  } else if (currentLang === "rus") {
    button.textContent = label === main.rings.rus ? main.about.rus : main.rings.rus;
  }
};
function toggleInstruction() {
  projector.toggleClass(styleClasses.footer.parent_opened);
  figure.toggleClass(styleClasses.figure.parent_state_off);  
};
function triggerShining() {
  if (event.target.classList.contains(styleClasses.figure.button)) {
    const button = event.target;
    button.classList.add(styleClasses.figure.button_focused);
    figure.sectionDecor.toggleClass(styleClasses.figure.section_lightOn);
  }
};
function quitShining() {
  if (event.target.classList.contains(styleClasses.figure.button)) {
    const button = event.target;
    button.classList.remove(styleClasses.figure.button_focused);
    figure.sectionDecor.toggleClass(styleClasses.figure.section_lightOn);
  }
};
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
      engButton.classList.add(styleClasses.header.button_active);
    } else if (conf.current.lang === "rus") {
      rusButton.classList.add(styleClasses.header.button_active);
    }
  });
};
function openMainFrame() {
  Memory.lock([header.create(), figure.create(), projector.create()]);
  setLanguageButtons();
  if (conf.current.projectorOpened) {
    projector.toggleClass(styleClasses.footer.parent_opened);
    toggleLabel();
  }
};
function removeMainFrame() {
  Memory.remove([header, figure, projector]);
};
function openMemoryFrame() {
  Memory.lock([header.create(), gallery.create(), projector.create()]);
  const textElement = gallery.block.querySelector(".main__text-element");
  const texts = Array.from(textElement.children);
  texts.forEach((element, id) => {
    if (id % 2 === 1) {
      element.classList.add(styleClasses.main.text_anType_direct);
    } else {
      element.classList.add(styleClasses.main.text_anType_reverse);
    }
  })
  header.asideRight.toggleClass(styleClasses.disabled);
  setLanguageButtons();
  if (conf.current.projectorOpened) {
    if (conf.current.projectorMode === "text") {
      readText();
    };
  };
  setSoundSource();
  if (conf.current.sound === "on" || conf.current.sound === "hold") {
    playSound();
  };
};
function removeMemoryFrame() {
  pauseSound();
  Memory.remove([header, gallery, projector]);
};
function lookInImage() {
  const image = event.target;
  const imageElement = image.parentElement;
  if (!imageElement.classList.contains(styleClasses.main.imageElement_opened)) {
    imageElement.classList.add(styleClasses.main.imageElement_touched);
  }
};
function lookOutImage() {
  const imageElement = event.target.parentElement;
  if (!imageElement.classList.contains(styleClasses.main.imageElement_opened)) {
    imageElement.classList.remove(styleClasses.main.imageElement_touched);
  }
};
function lookInTexts() {
  const textElement = gallery.block.querySelector(".main__text-element")
  textElement.classList.add(styleClasses.main.textElement_touched);
};
function lookOutTexts() {
  const textElement = gallery.block.querySelector(".main__text-element")
  textElement.classList.remove(styleClasses.main.textElement_touched);
};
function openWide() {
  if (conf.memory.imageID.startsWith("i")) {
    const lens = projector.matter()[0];
    lens.setAttribute("src", popupData[conf.memory.imageID]);
  } else if (conf.memory.imageID.startsWith("v")) {
    const lens = projector.matter()[0].firstElementChild;
    conf.memory.videoPlayer = projector.matter()[0];
    lens.setAttribute("src", popupData[conf.memory.imageID]);
  }
  conf.memory.imageElement.classList.remove(styleClasses.main.imageElement_touched);
  conf.memory.imageElement.classList.add(styleClasses.main.imageElement_opened);
  gallery.title.toggleClass(styleClasses.main.title_hidden);
  gallery.navButton.toggleClass(styleClasses.main.navButton_hidden);
  projector.toggleClass(styleClasses.footer.parent_projector);
};
function readText() {
  const lens = projector.matter()[0];
  const textsArray = popupData[conf.memory.textElementID];
  const text = textsArray[conf.current.lang][conf.memory.textID];
  text.forEach((string) => {
    if (string) {
      const newString = document.createElement("p");
      newString.textContent = string;
      lens.append(newString);
    };
    return;
  })
  conf.memory.textElement.classList.remove(styleClasses.main.imageElement_touched);
  header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
  gallery.title.toggleClass(styleClasses.main.title_hidden);
  gallery.navButton.toggleClass(styleClasses.main.navButton_hidden);
  projector.toggleClass(styleClasses.footer.parent_projector);
};
function gaveAway() {
  if (conf.current.projectorMode !== "text") {
    conf.memory.imageElement.classList.remove(styleClasses.main.imageElement_opened);
  } else {
    header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
  };
  gallery.title.toggleClass(styleClasses.main.title_hidden);
  gallery.navButton.toggleClass(styleClasses.main.navButton_hidden);
  projector.toggleClass(styleClasses.footer.parent_projector);
};

function update() {
  if (conf.current.frame === "main") {
    removeMainFrame();
    openMainFrame();
    updateCoreInterface();
    header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
    header.asideRight.toggleClass(styleClasses.header.aside_hidden);
    figure.shield.toggleClass(styleClasses.figure.shield_hidden);
  } else {
    removeMemoryFrame();
    openMemoryFrame();
    updateCoreInterface();
  }
};
function updateCoreInterface() {
  coreInterface.screenButton.remove();
  coreInterface.soundButton.remove();
  coreInterface.lock([coreInterface.screenButton.create(), coreInterface.soundButton.create()]);
}
function updateIntro() {
  Memory.remove([header, intro]);
  Memory.lock([header.create(), intro.create()]);
  header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
  header.asideRight.toggleClass(styleClasses.disabled);
  setLanguageButtons();
  updateCoreInterface();
}
function updateProjector() {
  Memory.remove([projector]);
  Memory.lock([projector.create()]);
};
function startProgram() {
  Memory.remove([header, intro]);
  openMainFrame();
  blastMemory();
};

(function openIntro() {
  Memory.lock([header.create(), coreInterface.create(), intro.create()]);
  header.asideLeft.toggleClass(styleClasses.header.aside_hidden);
  header.asideRight.toggleClass(styleClasses.disabled);
  setLanguageButtons();
})();
