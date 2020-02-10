import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import Draggable from 'gsap/Draggable';
import { Viewport } from 'pixi-viewport';
import * as Prefab from './prefabs';

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

function addDraggable (displayObject) {
  displayObject.buttonMode = true;
  displayObject.interactive = true;

  displayObject
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove);
}

function getBounds (displayObject) {
	return {
		left: displayObject.x,
		right: displayObject.x + displayObject.width,
		top: displayObject.y,
		bottom: displayObject.y + displayObject.height,
		height: displayObject.height,
		centerY: displayObject.y + displayObject.height / 2,
		centerY: displayObject.y + displayObject.height / 2,
	}
}

function main (_, resources) {
  const sprites = photoIds.map((resourceId) => {
    const sprite = new PIXI.Sprite(resources[resourceId].texture);
    sprite.hitArea = new PIXI.Rectangle(0, 0, sprite.width, sprite.height);
    addDraggable(sprite);

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

  const linkBetweenActivities = new PIXI.Graphics();
  viewport.addChild(linkBetweenActivities);

  // Activities
  // -----------------
  const board1 = Prefab.Board();
  board1.x = 200;
  board1.y = 400;
	addDraggable(board1);
	viewport.addChild(board1);

	const board2 = Prefab.Board({ isSelected: true });
  board2.x = -800;
  board2.y = -400;
  addDraggable(board2);
  viewport.addChild(board2);
	
	const board3 = Prefab.Board({ isSelected: true });
  board3.x = 1600;
  board3.y = 800;
  addDraggable(board3);
	viewport.addChild(board3);
	
	const board4 = Prefab.Board();
  board4.x = 3000;
  board4.y = -1600;
  addDraggable(board4);
	viewport.addChild(board4);
	
	const board5 = Prefab.Board();
  board5.x = -1600;
  board5.y = 1300;
  addDraggable(board5);
	viewport.addChild(board5);
  
  app.ticker.add(() => {
    const bounds2 = getBounds(board2);
    const bounds3 = getBounds(board3);
    
    linkBetweenActivities.clear();
    linkBetweenActivities.lineStyle({
      width: 3,
      color: 0x6462EA
    });
    linkBetweenActivities.moveTo(bounds2.right - 10, bounds2.centerY);
    linkBetweenActivities.lineTo(bounds3.left + 10, bounds3.centerY);
  });
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
