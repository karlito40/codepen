<script>
import { DEV } from '../constants';
import Board from './Board.svelte';
import Minesweeper from '../game/Minesweeper';

const { store: minesweeper } = new Minesweeper({
  rows: 16,
  cols: 30,
  mines: 99
});
</script>

<div class="App">
  <div class="scene">
    <Board minesweeper={$minesweeper}/>
    
    {#if $minesweeper.completedAt}
      <div class="end-game">
        {$minesweeper.hasWon() ? 'Winner' : 'Loser' }
      </div>
    {/if}
  </div>

  <img class="preload-assets" src="icons/flag.png" alt="">
  <img class="preload-assets" src="icons/bomb.png" alt="">
</div>
 
<style lang="scss">
:global(*, *:after, *:before) {
	box-sizing: border-box;
}

:global(html, body) {
	position: relative;
	width: 100%;
	height: 100%;
}

:global(body) {
	margin: 0;
  padding: 0;
}

.App {
  padding: 50px 20px;
  position: relative;
  text-align: center; 

  .scene {
    position: relative;
    display: inline-block;
  }

  .end-game {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.3);
    color: white;
    text-shadow: 0 0 10px rgba(0,0,0,0.6);
    font-size: 73px;
    font-family: 'Asap', Arial, sans-serif;
  }
}

.preload-assets {
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  height: 0;
  width: 0;
}
</style>