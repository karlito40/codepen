<script>
import { onMount } from 'svelte';
import { TimelineMax, Linear, Elastic } from 'gsap/all';
import { Kirby, KirbyStare, kirby } from '../prefabs/kirby';
import { Wadle, WadleStare, wadle } from '../prefabs/wadle';
import Exclamation from '../prefabs/Exclamation';
import GameLayout from '../ui/GameLayout';

let backLayer$;
let frontLayer$;
let charaLayer$;
let score = 0;
let tl;
let winner, loser;

const heroes = {
  [kirby.id]: Kirby,
  [wadle.id]: Wadle,
};

const getHeroComponent = (hero) => heroes[hero.id];

const game = {
  state: 'running',
  me: {
    hero: {
      ...kirby,
      state: 'idle',
      component: getHeroComponent(kirby)
    }
  },
  opponent: { 
    hero: {
      ...wadle,
      state: 'idle',
      component: getHeroComponent(wadle)
    }
  }
};

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
    .call(() => score = 8, null, this, `+=${reactTime}`)
    .to(frontLayer$.querySelector('.Exclamation'), 0, { opacity: 0 })
    .addLabel('hit', '+=0.03')
    // shaking effect
    // .to([backLayer$, charaLayer$], 0, { y: 1 }, 'hit')
    // .to([backLayer$, charaLayer$], 0.05, { y: 0, ease: Elastic.easeOut.config( 5, 0.1) }, 'hit')
    // red hit background
    .to(backLayer$, 0, { mixBlendMode: 'lighten' }, 'hit')
    .to(backLayer$.querySelector('.mask'), 0, { opacity: 1 }, 'hit')
    .to(backLayer$.querySelector('.mask'), 0.04, { background: 'red'}, 'hit')
    .addLabel('hit:after')
    .to(backLayer$, 0, { mixBlendMode: 'normal'}, 'hit:after') // remove red hit backgroubd
    .to(backLayer$.querySelector('.mask'), 0.04, { background: 'white' }, 'hit:after')
    .to(backLayer$.querySelector('.mask'), 0, { background: 'transparent', opacity: 0})
    .call(() => {
      winner = game.me;
      loser = game.opponent;
      winner.hero.state = 'attack_' + loser.hero.id;
      loser.hero.state = 'death_' + winner.hero.id;
      game.state = 'complete';
      game = game;
    });
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
  <div class="character-layer layer" bind:this={charaLayer$}>
    <div class="chara is-left">
      <svelte:component
        this={game.me.hero.component}
        animation={game.me.hero.state}
      />
    </div>
    <div class="chara is-right">
      <svelte:component
        this={game.opponent.hero.component}
        animation={game.opponent.hero.state}
        placement="right"
      />
    </div>
  </div>
  <div class="front-layer layer" bind:this={frontLayer$}>
    <Exclamation qty="1"/>
    <div class="endgame-feedback">
      {#if game.state === 'complete'}
        <div class="endgame-feedback__label">
          {#if winner} Winner {winner.hero.name}!!
          {:else} Tie
          {/if}
        </div>
      {/if}
    </div>
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
  & { z-index: 1; }

  .mask {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: black;
    opacity: 0;
  }

  :global(.Stare) {
    & {
      position: absolute;
      left: 0; right: 0;
    }

    &.from-left { top: 0; }
    &.from-right { bottom: 0; }
  }
}

.character-layer {
  & { z-index: 3; }

  :global(.chara) {
    
    & { 
      position: absolute;
      bottom: 67px;
    }

    &.is-left { left: 46px; }
    &.is-right { right: 65px; }
  }
}

.front-layer {
  & { z-index: 4; }

  :global(.Exclamation) {
    position: absolute;
    top: 102px; left: 105px; 
    opacity: 0;
  }
}

.endgame-feedback {
  & {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;  
  }

  .endgame-feedback__label {
    position: absolute;
    bottom: 24px;
    width: 100%;
    text-align: center;
    font-family: MatchupPro, sans-serif;
    color: white;
    text-shadow: 1px 1px black;
    font-size: 23px;
  }
}
</style>