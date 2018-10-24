import Interactable from './Interactable';

export default class Draggable extends Interactable {
  constructor(target, options = {}) {
    super(target, options);

    this.target.dataset.draggable = true;

    this.on('mouseover', this.mouseover);
    this.on('mouseout', this.mouseout);

    this.shareSignal.addListener('resizeenter', this.onResizeEnter);
    this.shareSignal.addListener('resizeleave', this.onResizeLeave);
  }

  unset() {
    this.shareSignal.removeListener('resizeenter', this.onResizeEnter);
    this.shareSignal.removeListener('resizeleave', this.onResizeLeave);

    return super.unset();
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
      bubbles: false, 
      cancelable: true,
    });
    
    customEvent.dx = this.dragRects.deltaPointer.x;
    customEvent.dy = this.dragRects.deltaPointer.y;

    this.target.dispatchEvent(customEvent);
  }

  onMouseDown(e) {
    if(!this.isActivable || (this.target !== e.target && e.target.closest('[data-draggable]') !== this.target)) {
      return;
    }

    this.isDragging = true;

    this.dragRects = {
      pointer: {x: e.clientX, y: e.clientY},
      deltaPointer: {x: 0, y: 0},
    };

    this.target.dispatchEvent(new CustomEvent('dragstart', {
      bubbles: false, 
      cancelable: true,
    }));
  }

  enter() {
    if(!this.isResizeActive) {
      this.isActivable = true;
      this.target.style.cursor = 'move';
    }
  }

  leave() {
    if(!this.isResizeActive) {
      this.isActivable = false;
      this.target.style.cursor = '';
    }
  }

  onResizeEnter = () => {
    this.isResizeActive = true;
    this.isActivable = false;
    this.target.style.cursor = '';
  }

  onResizeLeave = () => {
    this.isResizeActive = false;
    if(this.isIn) {
      this.enter();
    } else {
      this.leave();
    }
  }

  mouseover = (e) => {
    this.isIn = true;
    this.enter();
  }

  mouseout = (e) => {
    this.isIn = false;
    this.leave();
  }
}