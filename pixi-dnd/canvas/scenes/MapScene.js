import * as PIXI from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import * as Prefab from '../prefabs';
import { IoC } from '../core';
import { getBounds } from '../utils';

const photoIds = ['photo-1', 'photo-2', 'photo-3', 'photo-4', 'photo-5', 'photo-6', 'photo-7', 'photo-8', 'photo-9'];

export default class MapScene {
  constructor () {
    this.app = IoC.get('app');
  }

  load () {
    // Todo: not shared
    photoIds.forEach((photoId) => {
      PIXI.Loader.shared.add(photoId, `${location.protocol}//${location.hostname}:8081/${photoId}.jpeg`);
    });

    return new Promise((resolve) => {
      PIXI.Loader.shared.load(resolve);
    });
  }

  build () {
    this.viewport = new Viewport({
      screenWidth: window.innerWidth,
      screenHeight: window.innerHeight,
      worldWidth: 1000,
      worldHeight: 1000,
      // the interaction module is important for wheel to work properly when renderer.view is placed or scaled
      interaction: this.app.renderer.plugins.interaction 
    });
    
    this.viewport
      .drag()
      .pinch()
      .wheel()
      .decelerate();

    // this._buildImages();
  
    this.linkBetweenActivities = new PIXI.Graphics();
    this.viewport.addChild(this.linkBetweenActivities);
  
    // Activities
    // -----------------
    this.board1 = Prefab.Board();
    this.board1.x = 200;
    this.board1.y = 400;
    this._addDrag(this.board1);
    this.viewport.addChild(this.board1);
  
    this.board2 = Prefab.Board({ isSelected: true });
    this.board2.x = -800;
    this.board2.y = -400;
    this._addDrag(this.board2);
    this.viewport.addChild(this.board2);
    
    this.board3 = Prefab.Board({ isSelected: true });
    this.board3.x = 1600;
    this.board3.y = 800;
    this._addDrag(this.board3);
    this.viewport.addChild(this.board3);
    
    this.board4 = Prefab.Board();
    this.board4.x = 3000;
    this.board4.y = -1600;
    this._addDrag(this.board4);
    this.viewport.addChild(this.board4);
    
    this.board5 = Prefab.Board();
    this.board5.x = -1600;
    this.board5.y = 1300;
    this._addDrag(this.board5);
    this.viewport.addChild(this.board5);

    return this.viewport;
  }

  tick () {
    const bounds2 = getBounds(this.board2);
    const bounds3 = getBounds(this.board3);
    
    this.linkBetweenActivities.clear();
    this.linkBetweenActivities.lineStyle({
      width: 3,
      color: 0x6462EA
    });
    this.linkBetweenActivities.moveTo(bounds2.right - 10, bounds2.centerY);
    this.linkBetweenActivities.lineTo(bounds3.left + 10, bounds3.centerY);
  }

  _buildImages () {
    const resources = PIXI.Loader.shared.resources;
    const sprites = photoIds.map((resourceId) => {
      const sprite = new PIXI.Sprite(resources[resourceId].texture);
      sprite.hitArea = new PIXI.Rectangle(0, 0, sprite.width, sprite.height);
      this._addDrag(sprite);
  
      this.viewport.addChild(sprite);
  
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

  _addDrag (displayObject) {
    displayObject.buttonMode = true;
    displayObject.interactive = true;

    displayObject
      .on('pointerdown', this._onDragStart.bind(this, displayObject))
      .on('pointerup', this._onDragEnd.bind(this, displayObject))
      .on('pointerupoutside', this._onDragEnd.bind(this, displayObject))
      .on('pointermove', this._onDragMove.bind(this, displayObject));
  }

  _onDragStart(targetObject, event) {
    this.pauseViewport();
  
    if (this.tween) {
      this.tween.kill();
    }
    
    targetObject.data = event.data;  
    targetObject.lastPosition = targetObject.data.getLocalPosition(targetObject.parent); 
  }

  _onDragMove(targetObject) {
    if (!targetObject.lastPosition) return;
  
    const newPosition = targetObject.data.getLocalPosition(targetObject.parent);
    targetObject.position.x += (newPosition.x - targetObject.lastPosition.x);
    targetObject.position.y += (newPosition.y - targetObject.lastPosition.y);
    targetObject.lastPosition = newPosition;
  }
  
  _onDragEnd(targetObject) {
    this.resumeViewport();
    
    targetObject.data = null;
    targetObject.lastPosition = null;
  }

  pauseViewport () {
    this._changeViewportState('pause');
  }

  resumeViewport() {
    this._changeViewportState('resume');
  }

  _changeViewportState (state) {
    this.viewport.plugins[state]('drag');
    this.viewport.plugins[state]('ping');
    this.viewport.plugins[state]('wheel');
    this.viewport.plugins[state]('decelerate');
  }
}
