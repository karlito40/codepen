import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { Viewport } from 'pixi-viewport';
import Photo1 from './images/photo-1.jpeg';
import Photo2 from './images/photo-2.jpeg';
import Photo3 from './images/photo-3.jpeg';
import Photo4 from './images/photo-4.jpeg';
import Photo5 from './images/photo-5.jpeg';
import Photo6 from './images/photo-6.jpeg';
import Photo7 from './images/photo-7.jpeg';
import Photo8 from './images/photo-8.jpeg';
import Photo9 from './images/photo-9.jpeg';

gsap.registerPlugin(Draggable); 

const app = new PIXI.Application({
  width: window.innerWidth, 
  height: window.innerHeight,
  backgroundColor: 0xF7CA70
});
document.body.appendChild(app.view);

const viewport = new Viewport({
  screenWidth: window.innerWidth,
  screenHeight: window.innerHeight,
  worldWidth: 1000,
  worldHeight: 1000,
  // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
  interaction: app.renderer.plugins.interaction 
});

app.stage.addChild(viewport);
viewport
    .drag()
    .pinch()
    .wheel()
    .decelerate()

function pauseCamera() {
  viewport.plugins.pause('drag');
  viewport.plugins.pause('ping');
  viewport.plugins.pause('wheel');
  viewport.plugins.pause('decelerate');
}

function resumeCamera() {
  viewport.plugins.resume('drag');
  viewport.plugins.resume('ping');
  viewport.plugins.resume('wheel');
  viewport.plugins.resume('decelerate');
}

PIXI.Loader.shared
  .add('photo1', Photo1)
  .add('photo2', Photo2)
  .add('photo3', Photo3)
  .add('photo4', Photo4)
  .add('photo5', Photo5)
  .add('photo6', Photo6)
  .add('photo7', Photo7)
  .add('photo8', Photo8)
  .add('photo9', Photo9)
  .load(main);

function main (_, resources) {
  const sprites = ['photo1', 'photo2', 'photo3', 'photo4', 'photo5', 'photo6', 'photo7', 'photo8', 'photo9'].map((resourceId) => {
    const sprite = new PIXI.Sprite(resources[resourceId].texture);
    sprite.buttonMode = true;
    sprite.interactive = true;
    sprite.hitArea = new PIXI.Rectangle(0, 0, sprite.width, sprite.height);

    sprite
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove);
  
    viewport.addChild(sprite);

    return sprite;
  });

  sprites[0].x = -200;
  sprites[0].y = -1300;

  sprites[1].x = 400;
  sprites[1].y = 1500;

  sprites[2].x = 900;
  sprites[2].y = 100;
  
  sprites[3].x = -1400;
  sprites[3].y = -300;

  sprites[4].x = -600;
  sprites[4].y = 200;

  sprites[5].x = 1400;
  sprites[5].y = -800;
  
  sprites[6].x = 2000;
  sprites[6].y = 700;
  
  sprites[7].x = -3000;
  sprites[7].y = 1000;
  
  sprites[8].x = -500;
  sprites[8].y = 900;
}

function onDragStart(event) {
  pauseCamera();
  if (this.tween) {
    this.tween.kill();
  }
  
  this.data = event.data;  
  this.lastPosition = this.data.getLocalPosition(this.parent); 
}

function onDragMove() {
  if (!this.lastPosition) return;

  const newPosition = this.data.getLocalPosition(this.parent);
  this.position.x += (newPosition.x - this.lastPosition.x);
  this.position.y += (newPosition.y - this.lastPosition.y);
  this.lastPosition = newPosition;
}

function onDragEnd() {
  resumeCamera();
  this.data = null;
  this.lastPosition = null;
}
