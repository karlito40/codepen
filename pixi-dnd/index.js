import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { IoC } from './core';
import * as Scene from './scenes';

// pour firefox...
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES , 16);

gsap.registerPlugin(Draggable); 

const app = new PIXI.Application({
  width: window.innerWidth, 
  height: window.innerHeight,
  backgroundColor: 0xF7CA70
});
document.body.appendChild(app.view);

IoC.set('app', app);

const mapScene = new Scene.Map();

mapScene.load()
  .then(() => mapScene.build())
  .then((displayObject) => app.stage.addChild(displayObject))
  .then(() => app.ticker.add(mapScene.tick.bind(mapScene)));
  