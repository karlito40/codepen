<script>
import Minesweeper from './game/Minesweeper';

const minesweeper = new Minesweeper({
  rows: 16,
  cols: 30,
  mines: 99
});
</script>

<div 
  class="minesweeper" 
  style="
    --rows: { minesweeper.nbRow }; 
    --cols: { minesweeper.nbCol }"
>
  {#each minesweeper.grid as row}
    {#each row as cell}
      <div class="cell">cell.label</div>
    {/each}
  {/each}
</div>

<style>
.minesweeper {
  display: inline-grid;
  border-top: 1px solid black;
  border-right: 1px solid black;
  grid-template: repeat(var(--rows), 40px) / repeat(var(--cols), 40px);
}

.minesweeper .cell {
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}

@media (max-width: 400px) {
  .minesweeper {
    grid-template: repeat(var(--rows), 10px) / repeat(var(--cols), 10px);
  }
}
</style>
