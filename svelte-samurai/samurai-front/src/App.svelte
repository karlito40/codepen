
<script>
import Navaid from 'navaid';
import { onDestroy, onMount } from 'svelte';

let Route, params, wrapper$;

const scene = {
  img: '/background.png',
  width: 256,
  height: 222,
  scale: 1
};

const router = Navaid('/')
  .on('/', () => import('./routes/Game.svelte').then(renderRoute))
  .on('/sprites', () => import('./routes/TestSprite.svelte').then(renderRoute))
  .listen();

onMount(autoScale);
onDestroy(router.unlisten);

function autoScale() {
  const rect = wrapper$.getBoundingClientRect()
  
  if(rect.width < rect.height) {
    scene.scale = rect.width / scene.width;
  } else {
    scene.scale = rect.height / scene.height;
  }
}

function renderRoute(m, obj) {
  params = obj || {};
  if (m.preload) {
    m.preload({ params }).then(() => {
      Route = m.default;
    });
  } else {
    Route = m.default;
  }
}
</script>

<svelte:window on:resize={autoScale}/>

<main class="App" >
  <div class="canvas-wrapper" bind:this={wrapper$}>
    <div class="canvas" style="{`
      background: url(${scene.img});
      width: ${scene.width}px;
      height: ${scene.height}px;
      transform: scale(${scene.scale})
    `}">
      
      <svelte:component this={Route} {params} />
    </div>
  </div>
</main>

<style lang="less">
:global(*, *:after, *:before) {
  box-sizing: border-box;
}

:global(body, html) {
  padding: 0;
  margin: 0;
  height: 100%;
  width: 100%;
}

.App {
  width: 100%;
  height: 100%;
  padding: 30px;
  background: url('/background.png') no-repeat;
  background-size: cover;
}

.canvas-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.canvas {
  position: relative;
  background-color: black;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.6), 0 0 0 9999px rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}
</style>