<script>
import { onMount } from 'svelte';
import { TimelineMax } from 'gsap/all';
import GameLayout from "../components/GameLayout";
import Kirby from "../components/sprites/Kirby";
import Wadle from "../components/sprites/Wadle";

let backLayer$;
onMount(() => {
  console.log('backLayer$', backLayer$)
});

let score = 0;

let tl;
function initScenario() {
  const reactTime = 0.8; 
  tl = new TimelineMax();
  tl.to(backLayer$.querySelector('.mask'), 1, { opacity: 0.8 });
  tl.to(backLayer$.querySelectorAll('.eye-wrapper'), 0.01, { opacity: 1}); 
  tl.to(backLayer$.querySelectorAll('.eye'), 1, { x: 0 });
  tl.to(backLayer$.querySelectorAll('.eye'), 1, { x: 0 });
  tl.to(backLayer$.querySelectorAll('.eye-wrapper'), 0.01, { opacity: 0 }, '+=0.5');
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
    <div class="eye-wrapper is-top">
      <div class="kirby-eye eye"></div>
    </div>
    <div class="eye-wrapper is-bottom">
      <div class="wadle-eye eye"></div>
    </div>
  </div>
  <div class="character-layer layer">
    <Kirby class="chara-left chara" animation="idle"/>
    <Wadle class="chara-right chara" animation="idle"/>
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

  .kirby-eye {
    background: url('/samurai-kirby.png') no-repeat -1px -1px;
    width: 254px;
    height: 44px;
  }

  .wadle-eye {
    background: url('/samurai-kirby.png') no-repeat 0 -53px;
    width: 256px;
    height: 46px;
  }

  .eye-wrapper {
    position: absolute;
    left: 0; right: 0;
    height: 44px;
    background: url('/eye-laser.png') 0 -1px repeat-x;
    opacity: 0;

    &.is-top {
      top: 0;

      .eye {
        transform: translateX(-100%);
      }
    }
    
    &.is-bottom {
      bottom: 0;  

      .eye {
        transform: translateX(100%);
      } 
    }
  }
  
}

.character-layer {
  z-index: 3;

  :global(.chara) {
    position: absolute;
    bottom: 67px;
  }
  
  :global(.chara-left) {
    left: 46px;
  }

  :global(.chara-right) {
    transform: rotateY(180deg);
    right: 65px;
  }
}
</style>