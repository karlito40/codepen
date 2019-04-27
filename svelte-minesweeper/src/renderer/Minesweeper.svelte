<script>
import Minesweeper from '../game/Minesweeper';
import { Flag, Bomb } from './icons';

const minesweeper = new Minesweeper({
  rows: 16,
  cols: 30,
  mines: 99
});
</script>

<div 
  class="Minesweeper" 
  style="
    --rows: { minesweeper.nbRow }; 
    --cols: { minesweeper.nbCol }"
>
  <div class="cell" data-label="1">1</div>
  <div class="cell" data-label="2">2</div>
  <div class="cell" data-label="3">3</div>
  <div class="cell" data-label="4">4</div>
  <div class="cell" data-label="5">5</div>
  <div class="cell" data-label="6">6</div>
  <div class="cell" data-label="7">7</div>
  <div class="cell" data-label="8">8</div>
  <div class="cell" data-state="hidden">
    <Flag/>
  </div>
  <div class="cell" data-state="hidden">
    <Bomb/>
  </div>
  {#each minesweeper.grid as row}
    {#each row as cell}
      <div class="cell" data-label="{cell.label}">
        {!cell.isBomb() && cell.label ? cell.label : ''}
      </div>
    {/each}
  {/each}
</div>

<style lang="scss">
.Minesweeper {
  display: inline-grid;
  grid-template: repeat(var(--rows), 30px) / repeat(var(--cols), 30px);
  grid-gap: 2px;
  font-family: 'Alfa Slab One';
}

.cell {
  border-radius: 4px;
  line-height: 27px;
  font-size: 18px;
  text-align: center;

  &[data-state="hidden"] {
    cursor: pointer;
    background: #ffffff;
    box-shadow: 0 -4px 0px #ccddee inset, 0px 0px 1px #303f4e inset;
    &:hover { background: green; }
  }

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
  }
}


@media (max-width: 400px) {
  .Minesweeper {
    grid-template: repeat(var(--rows), 10px) / repeat(var(--cols), 10px);
  }
}
</style>
