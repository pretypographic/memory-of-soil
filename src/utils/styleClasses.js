export const styleClasses = {
  body: ["body"],
  indicator: ["indicator"],
  coreInterface: {
    parent: ["interface"],
    flag: ["interface__flag"],
    screenButton: ["interface__button", "interface__button_for_screen"],
    soundButton: ["interface__button", "interface__button_for_sound"],
    label: ["interface__label"]
  },
  intro: {
    parent: ["intro"],
    text: ["intro__text"],
    phoneAdviseText: ["intro__text", "intro__text_phone"],
    img: ["intro__img"],
    button: ["intro__button"]
  },
  header: {
    parent: ["header"],
    asideLeft: [
      "header__aside",
      "header__aside_hide",
      "header__aside_type_left"
    ],
    asideRight: [
      "header__aside",
      "header__aside_hide",
      "header__aside_type_right"
    ],
    button: ["header__button"]
  },
  figure: {
    parent: ["figure"],
    sectionNav: [
      "figure__section", 
      "figure__section_type_nav"
    ],
    imgNav: "figure__img",
    modes: [
      "figure__img_type_title", 
      "figure__img_type_shine", 
      "figure__img_type_lit"
    ],
    sectionDecor: [
      "figure__section",
      "figure__section_type_decor"
    ],
    imgDecor: [
      "figure__img",
      "figure__img_type_lit"
    ],
    shield: ["figure__shield"],
    button: ["figure__button"],
  },
  main: {
    parent: ["main"],
    titleBlock: ["main__title-block"],
    title: ["main__title"],
    imageElement: ["main__image-element"],
    image: ["main__image"],
    textElement: ["main__text-element"],
    nav: ["main__nav"],
    navButton: ["main__nav-button"]
  },
  footer: {
    parent: ["footer"],
    article: ["footer__article"],
    section: [
      "footer__section", 
      "footer__names"
    ],
    slideProjector: ["slide-projector"],
    cinemaProjector: ["cinema-projector"],
    opaqueProjector: ["opaque-projector"],
    button: ["footer__button"],
  }
}