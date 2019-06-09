<script>
import { onMount } from 'svelte';
import { TimelineMax } from 'gsap/all';
import { Kirby, KirbyStare } from '../prefabs/kirby';
import { Wadle, WadleStare } from '../prefabs/wadle';
import GameLayout from '../ui/GameLayout';
import Exclamation from '../prefabs/Exclamation';

let backLayer$;
let score = 0;

let tl;
function initScenario() {
  const reactTime = 0.8; 
  tl = new TimelineMax();
  tl.to(backLayer$.querySelector('.mask'), 1, { opacity: 0.8 });
  tl.to(backLayer$.querySelectorAll('.Stare'), 0.01, { opacity: 1}); 
  tl.to(backLayer$.querySelectorAll('.Stare .face'), 1, { x: 0 });
  tl.to(backLayer$.querySelectorAll('.Stare .face'), 1, { x: 0 });
  tl.to(backLayer$.querySelectorAll('.Stare'), 0.01, { opacity: 0 }, '+=0.5');
  tl.to(backLayer$.querySelectorAll('.mask'), 0.5, { opacity: 0 });
  tl.call(() => score = 8, null, this, `+=${reactTime}`);
}

function toggleScenario() {
  if(!tl) {
    initScenario()
  } else if(!tl.reversed()){
    score = 0;
    tl.reverse();       
  } else {
    tl.play()
  }
}
</script>

<div class="debug-bar">
  <button on:click={toggleScenario}>Toggle</button>
</div>

<GameLayout toScore={score}>
  <div class="back-layer layer" bind:this={backLayer$}>
    <div class="mask"></div>
    <KirbyStare from="left"/>
    <WadleStare from="right"/>
  </div>
  <div class="character-layer layer">
    <Kirby class="chara is-left" animation="idle"/>
    <Wadle class="chara is-right" animation="idle"/>
  </div>
  <div class="front-layer layer">
  </div>
</GameLayout>

<style lang="less">
.layer {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
}

.debug-bar {
  position: absolute;
  z-index: 10;
}

.back-layer {
  z-index: 1;

  .mask {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: black;
    opacity: 0;
  }

  :global(.Stare) {
    position: absolute;
    left: 0; 
    right: 0;

    &.from-left { top: 0; }
    &.from-right { bottom: 0; }
  }
}

.character-layer {
  z-index: 3;

  :global(.chara) {
    position: absolute;
    bottom: 67px;

    &.is-left {
      left: 46px;
    }
   
    &.is-right {
      transform: rotateY(180deg);
      right: 65px;
    }
  }
}

.front-layer {
  z-index: 4;
}
</style>