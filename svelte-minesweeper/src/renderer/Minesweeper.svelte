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
  <!-- <div class="cell" data-label="1">1</div>
  <div class="cell" data-label="2">2</div>
  <div class="cell" data-label="3">3</div>
  <div class="cell" data-label="4">4</div>
  <div class="cell" data-label="5">5</div>
  <div class="cell" data-label="6">6</div>
  <div class="cell" data-label="7">7</div>
  <div class="cell" data-label="8">8</div> -->
  {#each minesweeper.grid as row}
    {#each row as cell}
      <div 
        class="cell" 
        data-label="{cell.label}"
        data-state="{cell.state}"
        
      >
        <div class="cell__body" style="--brightness: {getBrighteness(cell)}"></div>
      </div>
    {/each}
  {/each}
</div>

<style lang="scss">
.Minesweeper {
  display: inline-grid;
  grid-template: repeat(var(--rows), 30px) / repeat(var(--cols), 30px);
  font-family: 'Alfa Slab One';
  border-top: 1px solid black;
  border-left: 1px solid black;
}

.cell {
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  position: relative;

  &[data-state="HIDDEN"] {
    cursor: pointer;
    transition: 0.25s all;
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
  /*
  &[data-label="BOMB"] {
    border: 1px solid red;
    background: white;
  }

  &[data-label="0"] {
    background: #ccddee;
  }

  &[data-label="1"] {
    $label-color: #d6f1fb;
    background: $label-color;
    box-shadow: 0 -4px 0px scale-color($label-color, $lightness: -20%) inset;
    color: scale-color($label-color, $lightness: -50%);
  }

  &[data-label="2"] {
    $label-color: #bff9c3;
    background: $label-color;
    box-shadow: 0 -4px 0px scale-color($label-color, $lightness: -25%) inset;
    color: scale-color($label-color, $lightness: -50%);
  }

  &[data-label="3"] {
    $label-color: #ffcccc;
    background: $label-color;
    box-shadow: 0 -4px 0px scale-color($label-color, $lightness: -13%) inset;
    color: scale-color($label-color, $lightness: -50%);
  }

  &[data-label="4"] {
    $label-color: #f6d4f7;
    background: $label-color;
    box-shadow: 0 -4px 0px scale-color($label-color, $lightness: -13%) inset;
    color: scale-color($label-color, $lightness: -50%);
  }

  &[data-label="5"] {
    $label-color: #ffdcbd;
    background: $label-color;
    box-shadow: 0 -4px 0px scale-color($label-color, $lightness: -13%) inset;
    color: scale-color($label-color, $lightness: -50%);
  }

  &[data-label="6"] {
    $label-color: #91f9f0;
    background: $label-color;
    box-shadow: 0 -4px 0px scale-color($label-color, $lightness: -38%) inset;
    color: scale-color($label-color, $lightness: -50%);
  }

  &[data-label="7"] {
    $label-color: #444343;
    background: scale-color($label-color, $lightness: 25%);
    box-shadow: 0 -4px 0px $label-color inset;
    color: scale-color($label-color, $lightness: 95%);
  }

  &[data-label="8"] {
    $label-color: #909090;
    background: scale-color($label-color, $lightness: 30%);
    box-shadow: 0 -4px 0px $label-color inset;
    color: scale-color($label-color, $lightness: 95%);
  }*/
}


@media (max-width: 400px) {
  .Minesweeper {
    grid-template: repeat(var(--rows), 10px) / repeat(var(--cols), 10px);
  }
}
</style>
