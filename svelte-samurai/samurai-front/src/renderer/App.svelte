<script>
import store from '../store';
import { battle as socketBattle } from '../socket';
import GameScene from './GameScene.svelte';
</script>
  
<div class="App">
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
  {/if}
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
}
</style>
