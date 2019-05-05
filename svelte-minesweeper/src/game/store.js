import Minesweeper from './Minesweeper';

const minesweeper = new Minesweeper({
  rows: 16,
  cols: 30,
  mines: 99
});

export default minesweeper.store;