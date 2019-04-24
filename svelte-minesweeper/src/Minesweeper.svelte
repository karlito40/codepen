<script>
import flatMap from 'lodash/flatMap';
import chain from './utils/chain';

const board = {
  rows: 16,
  cols: 30
};

const nbMine = 99;
const nbCell = board.rows * board.cols;

function createCells(label, quantity) {
  return Array.from({ length:  quantity }, (_, index) => ({
    label, //[BOMB, BOMB_DISTANCE (0: empty)] 
    value: null // [REVEALED, FLAG, HIDDEN]
  }));
}

const grid = chain(
  [
    ...createCells('BOMB', nbMine),
    ...createCells(0, nbCell - nbMine),
  ])
  .shuffle()
  .chunk(board.cols)
  //.map(distance)
  .value();

// CALCULATE BOMB_DISTANCE
</script>

<div class="minesweeper" style="--rows: { board.rows }; --cols: { board.cols }">
  {#each grid as row, x}
    {#each row as col, y}
      <div class="cell" data-index="{ x+y }">[{x}, {y}]</div>
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
