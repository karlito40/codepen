<script>
import { onMount } from 'svelte';
import { TimelineMax } from 'gsap/all';
import GameLayout from '../ui/GameLayout';
import store from '../store';
import { game as gameSocket } from '../socket';
import Beekast from './Beekast';
import RegisterForm from './RegisterForm';
import EndSlide from './EndSlide';
import Thanks from './Thanks';
import MatchMaking from './MatchMaking';
import Game from './Game';

let scene = {
  name: undefined,
  key: undefined,
  ready: false
};

let sceneReady = false;
let curtainLayer$;
let tl;

$: if (scene.name === RegisterForm && $store.me) {
  goTo(MatchMaking);
}

$: if (scene.name !== Game && $store.game && !$store.game.completedAt) {
  goTo(Game);
}

function goTo(nextScene) {
  scene.ready = false;
  if(tl) {
    tl.kill();
  }
  
  const leaveDuration = scene.name ? 0.6 : 0;
  console.log('leaveDuration', leaveDuration);
  tl = new TimelineMax();
  tl
    .to(curtainLayer$, leaveDuration, { opacity: 1 })
    .call(() => {
      // if(scene.name === Game) {
      //   tl.pause();
      //   gameSocket.leave(() => {
      //     store.leaveGame();
      //     console.log('nextScene', nextScene);
      //     scene.name = nextScene
      //     tl.play();
      //   });
      // } else {
      //   scene.name = nextScene
      // }
      scene.name = nextScene;
    })
    .to(curtainLayer$, 0.6, { opacity: 0 })
    .call(() => {
      scene.ready = true;
      tl = null
    });
}

function onComplete() {
  // console.log('on complete')
  if(scene.name === Beekast) {
    goTo(RegisterForm)
  }

  if(scene.name === Game) {
    goTo(EndSlide);
  }
  
  if(scene.name === EndSlide) {
    goTo(Thanks);
  }
}

onMount(() => goTo(Beekast));
</script>

<svelte:head>
	<title>Samurai Kirby !</title>
</svelte:head>

<div class="Home">
  <GameLayout>
    {#if scene.name}
      <svelte:component 
        this={scene.name} 
        ready={scene.ready}
        on:complete={onComplete}
      />
    {/if}
    <div class="curtain-layer" bind:this={curtainLayer$}></div>
  </GameLayout>
</div>

<style lang="less">
.Home {
  & { height: 100%; width: 100%; }

  :global(.UserForm) {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
  }
}

.curtain-layer {
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: black;
  opacity: 0;
  z-index: 20;
  pointer-events: none;
}
</style>