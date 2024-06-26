"use strict";
import images from "../media/images/images.js";

const parameters = {
  _languages: ["eng", "rus"],
  _nav: [
    ["about", "о проекте"]
  ],
  _navRingStyles: [
    "width: 15vh; height: 15vh; top: 42vh; z-index: 9;",
    "width: 27vh; height: 27vh; top: 36vh; z-index: 8;",
    "width: 36vh; height: 36vh; top: 31.5vh; z-index: 7;",
    "width: 49vh; height: 49vh; top: 25vh; z-index: 6;",
    "width: 63vh; height: 63vh; top: 18vh; z-index: 5;",
    "width: 70vh; height: 70vh; top: 14.5vh; z-index: 4;",
    "width: 75vh; height: 75vh; top: 12vh; z-index: 3;",
    "width: 86vh; height: 86vh; top: 6.5vh; z-index: 2;",
    "width: 99vh; height: 99vh; top: 0vh; z-index: 1;"
  ],
  _navRingsImg: function () {
    const array = [];
    for (let i = 0; i <= 8; i++) {
      const titles = Object.values(images.title).map((string) => {
        return Object.values(string)[i];
      })
      array.push([
        titles,
        Object.values(images.lit)[i], 
        Object.values(images.shine)[i]
      ]);
    }
    return array;
  },
  _decorRingsImg: function () {
    const arrey = [];
    for (let i = 9; i <= 14; i++) {
      arrey.push(Object.values(images.shine)[i]);
    }
    return arrey;
  },
  _decorRingsStyles: function () {
    let array = [];
    for (let i = 0.2; i <= 0.8; i = i + 0.1) {
      array.push(`animation-delay: ${i}s`)
    };
    return array;
  }
};

export default parameters;