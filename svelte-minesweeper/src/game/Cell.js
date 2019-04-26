export const BOMB = 'BOMB'; 

export function createCells(quantity,  options) {
  return Array.from({ length:  quantity }, createCell.bind(null, options));
}

export function createCell(options) {
  return new Cell(options);
}

export default class Cell {
  constructor({ label } = {}) {
    this.label = label || 0; //[BOMB, NEAR_BOMB (0: empty)] 
    this.value = null // [REVEALED, FLAG, HIDDEN]
    this.position = null;
  }

  setLabel(label) { this.label = label; }
  setPosition(position) { this.position = position; }
  isBomb() { return this.label === BOMB; }
}