import * as PIXI from 'pixi.js';
import { IoC } from './core';
import * as Scene from './scenes';

export default function boot () {
		// pour firefox...
	PIXI.settings.SPRITE_MAX_TEXTURES = Math.min(PIXI.settings.SPRITE_MAX_TEXTURES , 16);

	const app = new PIXI.Application({
		width: window.innerWidth, 
		height: window.innerHeight,
		backgroundColor: 0xF2F2F2
	});
	document.body.appendChild(app.view);

	IoC.set('app', app);

	const mapScene = new Scene.Map();

	return mapScene.load()
		.then(() => mapScene.build())
		.then((displayObject) => app.stage.addChild(displayObject))
		.then(() => app.ticker.add(mapScene.tick.bind(mapScene)));
} 
