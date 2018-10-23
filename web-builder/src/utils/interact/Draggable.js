import Interactable from './Interactable';

export default function draggable(target, options = {}) {
  return new Draggable(target, options);
}

class Draggable extends Interactable {
  constructor(target, options = {}) {
    super(target, options);

    this.on('mouseover', this.mouseover);
    this.on('mouseout', this.mouseout);
  }

  onMouseUp(e) {
    this.isDragging = false;
  }

  onMouseMove(e) {
    if(!this.isDragging) {
      return;
    }

    this.dragRects.deltaPointer.x = e.clientX - this.dragRects.pointer.x;
    this.dragRects.pointer.x = e.clientX;
    
    this.dragRects.deltaPointer.y = e.clientY - this.dragRects.pointer.y;
    this.dragRects.pointer.y = e.clientY;

    const customEvent = new CustomEvent('dragmove', {
      bubbles: true, 
      cancelable: true,
    });
    
    customEvent.dx = this.dragRects.deltaPointer.x;
    customEvent.dy = this.dragRects.deltaPointer.y;

    this.target.dispatchEvent(customEvent);
  }

  onMouseDown(e) {
    if(!this.isActivable) {
      return;
    }

    this.isDragging = true;


    this.dragRects = {
      pointer: {x: e.clientX, y: e.clientY},
      deltaPointer: {x: 0, y: 0},
    };

    this.target.dispatchEvent(new CustomEvent('dragstart', {
      bubbles: true, 
      cancelable: true,
    }));
  }

  mouseover = (e) => {
    this.isActivable = true;
    this.target.style.cursor = 'move';
  }

  mouseout = (e) => {
    this.isActivable = false;
    this.target.style.cursor = 'auto';
  }
}