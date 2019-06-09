<script>
import { padStart } from 'lodash-es';
import { onMount } from 'svelte';
import { TweenMax, Linear } from 'gsap/all';
export let toScore = 0;

let game$;
let currentScore = toScore;
let oldScore = toScore;
let tweenScore = null;

$: {
  if(oldScore !== toScore) {
    updateScore();
    oldScore = toScore;
  }
}

const scene = {
  img: '/background.png',
  width: 256,
  height: 222,
  scale: 1
};


onMount(autoScale);

function updateScore() {
  if(tweenScore) {
    tweenScore.kill();
  }
  
  // TODO: calculer le temps d'animation en fonction de la difference
  // entre currentScore et toScore
  const animObject = { v: currentScore };
  tweenScore = TweenMax.to(animObject, 0.2, {
    v: toScore,
    ease: Linear.easeNone,
    onUpdate: () => currentScore = ~~animObject.v
  });

}

function autoScale() {
  const container = game$.getBoundingClientRect()
  
  if(container.width < container.height) {
    scene.scale = container.width / scene.width;
  } else {
    scene.scale = container.height / scene.height;
  }
}
</script>

<svelte:window on:resize={autoScale}/>

<div class="GameLayout" bind:this={game$}>
  <div 
    class="Game__body" 
    style="{`
      background: url(${scene.img});
      width: ${scene.width}px;
      height: ${scene.height}px;
      transform: scale(${scene.scale});
    `}"
  >
    <slot/>
    <div class="sign">{padStart(currentScore, 2, 0)}</div>
  </div>
</div>

<style lang="less">
.GameLayout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Game__body {
  position: relative;
  background-color: black;
  box-shadow: 0 0 9px rgba(0, 0, 0, 0.6), 0 0 0 9999px rgba(255, 255, 255, 0.4);
  border-radius: 5px;
  overflow: hidden;
}

.sign {
  position: absolute;
  bottom: 57px;
  right: 18px;
  width: 25px;
  line-height: 21px;
  font-family: MatchupPro, sans-serif;
  text-align: center;
  font-size: 26px;
  color: #101010;
}
</style>
