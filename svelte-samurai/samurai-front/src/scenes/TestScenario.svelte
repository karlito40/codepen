<script>
import { onMount } from 'svelte';
import { TimelineMax, Linear } from 'gsap/all';
import { Kirby, KirbyStare } from '../prefabs/kirby';
import { Wadle, WadleStare } from '../prefabs/wadle';
import GameLayout from '../ui/GameLayout';
import Exclamation from '../prefabs/Exclamation';

let backLayer$;
let frontLayer$;
let score = 0;

let tl;
function initScenario() {
  const fireAt = 1; // 1 seconde 
  const reactTime = 0.8;  
  tl = new TimelineMax();
  // affichage du fond noir
  tl
    .to(backLayer$.querySelector('.mask'), 1, { opacity: 0.8 })
  // affichage des regards
    .to(backLayer$.querySelectorAll('.Stare'), 0, { opacity: 1 })
    .to(backLayer$.querySelectorAll('.Stare .face'), 0.4, { x: 0, ease: Linear.easeNone }, '+=0.8')
    .to(backLayer$.querySelectorAll('.Stare'), 0, { opacity: 0 }, '+=1.5')
  // suppression du fond noir
    .to(backLayer$.querySelectorAll('.mask'), 0.3, { opacity: 0 })
    .to(frontLayer$.querySelector('.Exclamation'), 0, { opacity: 1 }, `+=${fireAt}`)
  
  // * utiliser les labels quand j'aurais internet pour revoir la doc ...
    .call(() => score = 8, null, this, `+=${reactTime}`)
    .to(backLayer$.querySelector('.mask'), 0, { background: 'white', opacity: 1 })
    .addLabel('hit', '+=0.15')
    .to(backLayer$, 0, { mixBlendMode: 'lighten' }, 'hit')
    .to(backLayer$.querySelector('.mask'), 0, { background: 'red'}, 'hit');
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
  <div class="front-layer layer" bind:this={frontLayer$}>
    <Exclamation qty="1"/>
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

  :global(.Exclamation) {
    position: absolute;
    left: 105px;
    top: 102px;
    opacity: 0;
  }
}
</style>