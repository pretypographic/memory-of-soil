"use strict";

import "./index.css";
import planMemory from "./utils/plan.js";
import configuration from "./utils/configuration.js";
import parameters from "./utils/parameters.js";
import { Device } from "./modules/Device.js";
import { HeaderOrder } from "./modules/blocks/HeaderOrder.js";
import { FigureOrder } from "./modules/blocks/FigureOrder.js";

console.log(planMemory);
const Memory = new Device({
  configuration: configuration,
  plan: planMemory
});
Memory.initiate();

const { headerBlock, figureBlock, projectorBlock } = planMemory;
headerBlock.initiate();
figureBlock.initiate();
projectorBlock.initiate();

const headerOrder = new HeaderOrder({ 
  devise: Memory,
  headerBlock: headerBlock,
  figureBlock: figureBlock,
  projectorBlock: projectorBlock,
  configuration: configuration,
  parameters: parameters
});
headerBlock.asideLeft.plan.addProcessor("click", function (event) {
  headerOrder.switchLanguage(event);
});
headerBlock.asideRight.plan.addProcessor("click", function (event) {
  headerOrder.handleNavClick(event);
});

const figureOrder = new FigureOrder({
  figureBlock: figureBlock
});
figureBlock.sectionNav.plan.addProcessor("mouseover", function (event) {
  figureOrder.handleMouseOver(event);
});
figureBlock.sectionNav.plan.addProcessor("mouseout", function (event) {
  figureOrder.handleMouseOut(event);
});

Memory.update();
headerOrder.setSwitch(Array.from(headerBlock.asideLeft.block.children)[configuration.current.lang]);
