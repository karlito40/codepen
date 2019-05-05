import { writable } from 'svelte/store';
import { createCells, BOMB } from './Cell';
import chain from '../utils/chain';

export function createMinesweeper(options) {
  return (new Minesweeper(options)).store;
}
export default class Minesweeper {
  constructor({ rows, cols, mines }) {
    this.nbRow = rows;
    this.nbCol = cols;
    this.nbMine = mines;
    this.nbCell = this.nbRow * this.nbCol;
    this.completedAt = undefined;
    this.state = 'IN_PROGRESS';

    this.cells = [
      ...createCells(this.nbMine, { label: BOMB }),
      ...createCells(this.nbCell - this.nbMine),
    ];

    this.grid = chain(this.cells)
      .shuffle()
      .chunk(this.nbCol)
      .value();
    
    this.initLabels();

    this.store = writable(this);
  }

  initLabels() {
    this.traverse((cell, position) => {
      cell.setPosition(position);
      
      if(!cell.isBomb()) {
        const nbNearMine = this.getSurrounding(cell)
          .filter(cell => cell.isBomb())
          .length;

        cell.setLabel(nbNearMine);
      }
    });
  }
  
  revealed(cell) {
    // TODO: Stop game / remove click
    if(cell.isBomb()) {
      this.state = 'LOST';
      this.completedAt = Date.now();
    }
    // TODO: WIN

    cell.revealed();
    this._revealedSurrounding(cell);
    this.store.set(this);
  }

  _revealedSurrounding(cell) {
    if(cell.label) {
      return;
    }

    this.getSurrounding(cell)
      .filter(cell => !cell.isRevealed())
      .forEach(surroudingCell => {
        this.revealed(surroudingCell);
      });
  }

  getSurrounding(cell) {
    const { x, y } = cell.position;

    return [
      this.getCell(x - 1, y - 1),  // nw
      this.getCell(x, y - 1),      // n
      this.getCell(x + 1, y - 1),  // ne
      this.getCell(x + 1, y),      // e
      this.getCell(x - 1, y),      // w
      this.getCell(x + 1, y + 1),  // se
      this.getCell(x, y + 1),      // s
      this.getCell(x - 1, y + 1)   // sw
    ].filter(cell => cell); // On supprime tout ce qui est en dehors de la grille
  }

  getCell(x , y) {
    return this.grid[y] && this.grid[y][x];
  }

  traverse(cb) {
    this.grid.forEach((row, y) => {
      row.forEach((cell, x) => {
        cb(cell, { x, y });
      });
    });
  }

  hasWon() { return this.state === 'WON' }
}
