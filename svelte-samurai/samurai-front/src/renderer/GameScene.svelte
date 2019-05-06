<script>
import { onMount, onDestroy } from 'svelte';
import { battle as socketBattle, socket } from '../socket';
import VersusBar from './VersusBar.svelte';

export let battle;

$: battleOver = battle.winner !== undefined;
$: isWinner = battleOver && battle.winner === socket().id;
$: if(battleOver) {
  stop();
}

onMount(start);
onDestroy(stop);

function start() {
  document.addEventListener('mousedown', socketBattle.attack);
  document.addEventListener('keydown', socketBattle.attack);
}

function stop() {
  document.removeEventListener('mousedown', socketBattle.attack);
  document.removeEventListener('keydown', socketBattle.attack);
}
</script>

<div class="GameScene">
  <VersusBar battle={battle}/>

  <img src="/monsters/monster-12-idle.png" class="monster monster--left">
  <img src="/monsters/flip/monster-19-idle.png" class="monster monster--right">

  {#if battle.actived}
    <div class="battle-actived"></div>
  {/if}
  
  {#if battleOver}
    <div class="battle-over">
      <span>{isWinner ? 'WINNER' : 'LOSER'}</span>
    </div>
  {/if}
  
</div>

<style lang="less">
.GameScene {
  position: relative;
  max-width: 700px;
  width: 100%;
  max-height: 500px;
  background: url(/levels/region-1.jpg) no-repeat center center;

  .monster {
    position: absolute;
    bottom: 50px;
    
    &--left {
      left: 100px;
    }

    &--right {
      right: 100px;
    }
  }

  .battle-actived {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: red;
  }

  .battle-over {
    position: absolute;
    top: 30px;
    width: 100%;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: white;
    text-shadow: 2px 2px black;
  }

  .VersusBar {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
}

</style>
