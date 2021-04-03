import * as PIXI from 'pixi.js'
import EditorScene from './scenes/EditorScene'

export default function main () {
  const app = new PIXI.Application({
    width: window.innerWidth, height: window.innerHeight, 
    backgroundColor: 0x3F4146, 
    resolution: window.devicePixelRatio || 1,
    antialias: true
  });
  
  document.body.appendChild(app.view);
  window.addEventListener('resize', () => {
    app.renderer.resize(window.innerWidth, window.innerHeight);
  });
  
  const scene = new EditorScene(app)
  scene.load()
    .then(() => scene.build())
    .then((displayObject) => app.stage.addChild(displayObject))
    .then(() => app.ticker.add(scene.tick.bind(scene)))
}

main()