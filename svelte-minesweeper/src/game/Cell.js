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
    this.position = null;
  }

  getStateDisplay() {
    return (this.state === 'REVEALED' && !this.isBomb() && this.label)
      ? this.label
      : '';
  }
  setLabel(label) { this.label = label; }
  setPosition(position) { 
    this.position = position; 
    // if(this.position.x > 3 && this.position.x < 6 && this.position.y > 2 && this.position.y < 5) {
    //   this.state = 'REVEALED';
    // }
  }
  isBomb() { return this.label === BOMB; }
}