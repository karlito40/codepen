import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { Viewport } from 'pixi-viewport';

// pour firefox...
PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES , 16);

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

const photoIds = ['photo-1', 'photo-2', 'photo-3', 'photo-4', 'photo-5', 'photo-6', 'photo-7', 'photo-8', 'photo-9'];

photoIds.forEach((photoId) => {
  PIXI.Loader.shared.add(photoId, `${location.protocol}//${location.hostname}:8081/${photoId}.jpeg`);
});

PIXI.Loader.shared.load(main);

function main (_, resources) {
  const sprites = photoIds.map((resourceId) => {
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
