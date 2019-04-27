<script>
import Minesweeper from '../game/Minesweeper';

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
  <div class="cell has-1">1</div>
  <div class="cell has-2">2</div>
  <div class="cell has-3">3</div>
  <div class="cell has-4">4</div>
  <div class="cell has-5">5</div>
  <div class="cell has-6">6</div>
  <div class="cell has-7">7</div>
  <div class="cell has-8">8</div>
  <div class="cell has-0"></div>
  <div class="cell has-0"></div>
  <div class="cell has-0"></div>
  {#each minesweeper.grid as row}
    {#each row as cell}
      <div class="cell is-hidden"></div>
    {/each}
  {/each}
</div>

<style>
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
}

.cell.is-hidden {
  background: #ffffff;
  box-shadow: 0 -4px 0px #ccddee inset, 0px 0px 1px #303f4e inset;
}

.cell.has-1 {
  background: #24bbed;
  box-shadow: 0 -4px 0px #0095db inset;
  color: #88dded;
}

.cell.has-2 {
  background: #ffdd43;
  box-shadow: 0 -4px 0px #ff9833 inset;
  color: #ffff66;
}

.cell.has-3 {
  background: #ff51a2;
  box-shadow: 0 -4px 0px #de2286 inset;
  /* color: #fffbfb63; */
  color: #ffa7d0;
}

.cell.has-4 {
  background: #f76060;
  box-shadow: 0 -4px 0px #d41b1b inset;
  color: #d21212;
}

.cell.has-5 {
  background: #c68d8d;
  box-shadow: 0 -4px 0px #8e6868 inset;
  color: #946b6b;
}

.cell.has-6 {
  background: #2af9e6;
  box-shadow: 0 -4px 0px #1bd6c5 inset;
  color: #51b3b3;
}

.cell.has-7 {
  background: #5d5b6b;
  box-shadow: 0 -4px 0px #272727 inset;
  color: #8e9898;
}

.cell.has-8 {
  background: #c2c1c5;
  box-shadow: 0 -4px 0px #909090 inset;
  color: #909090;
}

.cell.has-0 {
  background: #ccddee;
}

@media (max-width: 400px) {
  .Minesweeper {
    grid-template: repeat(var(--rows), 10px) / repeat(var(--cols), 10px);
  }
}
</style>
