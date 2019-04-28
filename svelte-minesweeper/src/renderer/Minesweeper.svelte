<script>
import Minesweeper from '../game/Minesweeper';
import { Flag, Bomb } from './icons';

const minesweeper = new Minesweeper({
  rows: 16,
  cols: 30,
  mines: 99
});

const nbGradientColor = 16;

const distanceMax = Math.hypot(minesweeper.nbCol, minesweeper.nbRow);
const needStep = Math.ceil(distanceMax / (nbGradientColor));

let colors = {};
$: test = Object.keys(colors).length;

function getBrighteness(cell) {
  const distance = Math.hypot(cell.position.x, cell.position.y);
  const colorStep = ~~(distance / needStep);
  
  const color=  1 - (colorStep / 24);
  colors[color] = color;
  return color;
}

</script>

<div>nbGradientColor: {nbGradientColor}</div>
<div>nbColor: {test}</div>

<div 
  class="Minesweeper" 
  style="
    --rows: { minesweeper.nbRow }; 
    --cols: { minesweeper.nbCol }"
>
  {#each minesweeper.grid as row}
    {#each row as cell}
      <div 
        class="cell" 
        data-label="{cell.label}"
        data-state="{cell.state}"
      >
        <div
          class="cell__body" 
          style="--brightness: {getBrighteness(cell)}"
        >
          {cell.getStateDisplay()}
        </div>
      </div>
    {/each}
  {/each}
</div>

<style lang="scss">
.Minesweeper {
  display: inline-grid;
  grid-template: repeat(var(--rows), 30px) / repeat(var(--cols), 30px);
  font-family: 'Alfa Slab One';
  border-top: 2px solid black;
  border-left: 2px solid black;
  font-size: 16px;
  line-height: 30px;
}

.cell {
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  position: relative;

  .cell__body { 
    height: 100%; 
    width: 100%; 
  }

  &[data-state="HIDDEN"] {
    cursor: pointer;
    transition: 0.25s all;
    box-shadow: 1px 1px 3px rgba(0,0,0, 0.3);

    &:before {
      content: '';
      display: block;
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      border-left: 2px solid rgba(255, 255, 255, 0.5);
      border-top: 2px solid rgba(255, 255, 255, 0.5);
    }

    .cell__body {
      filter: brightness(var(--brightness));
      background-color: #43FFFF;
      height: 100%;
      width: 100%;
    }

    &:hover {
      &:before {
        box-shadow: 0 0 2px rgba(0, 0, 0, 0.3) inset
      }

      .cell__body {
        background: radial-gradient(farthest-corner, #4be0e0, #13768c 300%);
      }
    }
  }

  &[data-state="REVEALED"] {
    position: static;

    .cell__body {
      background-color: #ccf7f7;
    }
  }

  &[data-label="1"] {
    color: #4056BC;
  }
  
  &[data-label="2"] {
    color: #1E5009;
  }

  &[data-label="3"] {
    color: #A91C15;
  }
  
  &[data-label="4"] {
    color: #4a0cad;
  }

  &[data-label="5"] {
    color: #af6219;
  }
  
  &[data-label="6"] {
    color: #47c5c0;
  }

  &[data-label="7"] {
    color: black;
  }
  
  &[data-label="8"] {
    color: #888C8C;
  }
}


@media (max-width: 400px) {
  .Minesweeper {
    grid-template: repeat(var(--rows), 10px) / repeat(var(--cols), 10px);
  }
}
</style>
