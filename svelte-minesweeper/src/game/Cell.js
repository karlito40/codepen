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
    //this.state = 'REVEALED' // [HIDDEN, REVEALED, FLAG, HIDDEN]
    this.state = 'HIDDEN' // [HIDDEN, REVEALED, FLAG, HIDDEN]
    //this.state = 'FLAG' // [HIDDEN, REVEALED, FLAG, HIDDEN]

    const rand = Math.random();
    this.state =  (rand < 0.33)
      ? 'REVEALED' 
      : (rand > 0.66)
        ? 'FLAG'
        : 'HIDDEN';
    //this.state = Math.random() > 0.5 ? 'FLAG' : 'HIDDEN';
    this.position = null;
  }

  revealed() {
    this.state = 'REVEALED';
  }

  setLabel(label) { this.label = label; }
  setPosition(position) { this.position = position; }

  isFlag() { return this.state === 'FLAG'; }
  isRevealed() { return this.state === 'REVEALED'; }
  isBomb() { return this.label === BOMB; }
}