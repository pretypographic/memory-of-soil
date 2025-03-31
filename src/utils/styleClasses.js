export const styleClasses = {
  body: ["body"],
  indicator: ["indicator"],
  coreInterface: {
    parent: ["interface"],
    flag: ["interface__flag"],
    screenButton: ["interface__button", "interface__button_for_screen"],
    soundButton: ["interface__button", "interface__button_for_sound"],
    button_pressed: ["interface__button_pressed"],
    label: ["interface__label"],
    audio: ["interface__audio"]
  },
  intro: {
    parent: ["intro"],
    parent_hidden: ["intro_hidden"],
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
    aside_hidden: ["header__aside_hide"],
    button: ["header__button"],
    button_active: ["header__button_active"]
  },
  figure: {
    parent: ["figure"],
    parent_state_off: ["figure_state_off"],
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
    section_blast: ["figure__section_blast"],
    section_lightOn: ["figure__section_lightOn"],
    shield: ["figure__shield"],
    shield_hidden: ["figure__shield_hide"],
    button: ["figure__button"],
    button_focused: ["figure__button_focused"]
  },
  main: {
    parent: ["main"],
    titleBlock: ["main__title-block"],
    title: ["main__title"],
    title_frame_revelations: ["main__title", "main__title_frame_revelations"],
    title_hidden: ["main__title_hidden"],
    imageElement: ["main__image-element"],
    imageElement_opened: ["main__image-element_opened"],
    imageElement_touched: ["main__image-element_touched"],
    imageElement_video: ["main__image-element_video"],
    image: ["main__image"],
    textElement: ["main__text-element"],
    textElement_touched: ["main__text-element_touched"],
    text: ["main__text"],
    text_type_b: ["main__text", "main__text_type_b"],
    text_type_c: ["main__text", "main__text_type_c"],
    text_anType_direct: ["main__text_an-type_element-direct"],
    text_anType_reverse: ["main__text_an-type_element-reverse"],
    nav: ["main__nav"],
    navButton: ["main__nav-button"],
    navButton_hidden: ["main__nav-button_hidden"],
  },
  footer: {
    parent: ["footer"],
    parent_opened: ["footer_opened"],
    parent_projector: ["footer_projector"],
    article: ["footer__article"],
    section: [
      "footer__section", 
      "footer__names"
    ],
    slideProjector: ["slide-projector"],
    cinemaProjector: ["cinema-projector"],
    opaqueProjector: ["opaque-projector"],
    button: ["footer__button"],
  },
  disabled: ["disabled"]
}