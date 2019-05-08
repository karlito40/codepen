<script>
import { onMount } from 'svelte';
import store from '../store';
// import { battle as socketBattle } from '../socket';
// import GameScene from './GameScene.svelte';
// import DebugBar from './DebugBar.svelte';

let canvas$;

const scene = {
  img: '/background.png',
  width: 256,
  height: 222,
  scale: 1
};

onMount(autoScale);

function autoScale() {
  const rect = canvas$.getBoundingClientRect()
  
  if(rect.width < rect.height) {
    scene.scale = rect.width / scene.width;
  } else {
    scene.scale = rect.height / scene.height;
  }
}

</script>

<svelte:window on:resize={autoScale}/>

<div class="App" >
  <div class="canvas" bind:this={canvas$}>
    <div class="GameScene" style="{`
      background: url('${scene.img}') no-repeat;
      width: ${scene.width}px;
      height: ${scene.height}px;
      transform: scale(${scene.scale})
    `}">
      <div class="kirby"></div>
    </div>
  </div>
  

  <!-- <DebugBar/>

  {#if $store.searching}
    <div class="matchmaking">
      En attente d'un noob...
    </div>
  {:else if !$store.selectedBattle}
    <div class="matchmaking" on:click={socketBattle.join}>
      Faire la bagarre
    </div>
  {:else}
    <GameScene battle="{$store.selectedBattle}"/>
  {/if} -->
</div>

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
  padding: 30px;
  height: 100%;
  background: url('/background.png') no-repeat;
  background-size: cover;
}

.canvas {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.GameScene {
  position: relative;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.6), 0 0 0 9999px rgba(255, 255, 255, 0.4);
  border-radius: 5px;
}

.kirby {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: url('/samurai-kirby.png') no-repeat -9px -161px;
	width: 27px;
	height: 25px;
}

/* .App {
  & {
    background: url('/background.jpg');
    background-size: cover;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 100px;
  }

  :global(.GameScene) {
    flex: 1;
  }

  :global(.DebugBar) {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    height: 25px;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

.matchmaking {
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px black;
  cursor: pointer;
} */
</style>
