import "./index.css";
import settings from "./utils/settings.js";

const page = document.querySelector("body");

const loader = document.createElement("div");
loader.textContent = "загрузка...";
loader.classList.add("loader");
page.append(loader);

function handleMouseOver(event) {
  console.log(event.target);
  if (event.target.classList.contains("figure__img_type_title")) {
    event.target.classList.add("figure__img_visible");
  }
}

const renderHeader = new Promise((resolve, reject) => {
  const header = document.createElement("header");
  header.classList.add("header");
  const headerAsideLeft = document.createElement("aside");
  headerAsideLeft.classList.add(
    "header__aside", 
    "header__aside_type_left"
  );
  const headerAsideRight = document.createElement("aside");
  headerAsideRight.classList.add(
    "header__aside", 
    "header__aside_type_right"
  );

  settings.header.languages.forEach((string) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", string);
    button.classList.add("header__button");
    button.textContent = string;
    headerAsideLeft.append(button);
  });

  settings.header.nav.forEach((arrey) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", arrey[0]);
    button.classList.add("header__button");
    button.textContent = arrey[0];
    headerAsideRight.append(button);
  });

  header.append(headerAsideLeft, headerAsideRight);
  resolve(header);
});

const renderFigure = new Promise((resolve, reject) => {
  const figure = document.createElement("figure");
  figure.classList.add("figure");
  const figureSectionNav = document.createElement("section");
  figureSectionNav.classList.add(
    "figure__section",
    "figure__section_type_nav"
  );
  const figureSectionDecor = document.createElement("section");
  figureSectionDecor.classList.add(
    "figure__section",
    "figure__section_type_decor"
  );

  const nav = settings.figure.nav().map((arrey, i) => {
    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("aria-label", `Кольцо №${[i]}`);
    button.setAttribute("style", settings.figure.ringsStyle[i])
    button.classList.add("figure__button");

    const title = document.createElement("img");
    title.setAttribute("src", arrey[0]);
    title.setAttribute("alt", `${arrey[0]}`);
    title.classList.add(
      "figure__img",
      "figure__img_type_title"
    );
    button.append(title);

    const lit = document.createElement("img");
    lit.setAttribute("src", arrey[1]);
    lit.setAttribute("alt", `${arrey[1]}`);
    lit.classList.add(
      "figure__img",
      "figure__img_type_lit"
    );
    button.append(lit);

    const shine = document.createElement("img");
    shine.setAttribute("src", arrey[2]);
    shine.setAttribute("alt", `${arrey[2]}`);
    shine.classList.add(
      "figure__img",
      "figure__img_type_shine"
    );
    button.append(shine);
    return button;
  });

  const decor = settings.figure.decor().map((string) => {
    const lit = document.createElement("img");
    lit.setAttribute("src", string);
    lit.setAttribute("alt", `${string}`);
    lit.classList.add(
      "figure__img",
      "figure__img_type_lit"
    );
    return lit;
  });
  
  figure.append(figureSectionNav, figureSectionDecor);  
  figureSectionNav.append(...nav);
  figureSectionDecor.append(...decor);

  figureSectionNav.addEventListener('mouseover', handleMouseOver);
  resolve(figure);
})

Promise.all([renderHeader, renderFigure])
  .then((values) => {
    const [header, figure, navButtons, decorImages] = values;
    page.append(header);
    page.append(figure);
    return [navButtons, decorImages];
  })
  .then(() => {
    loader.remove();
  })
  .catch((err) => {
    console.error(err);
  });
