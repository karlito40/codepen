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
    this.leave();

    this.shareSignal.removeListener('resizeenter', this.onResizeEnter);
    this.shareSignal.removeListener('resizeleave', this.onResizeLeave);

    return super.unset();
  }

  onMouseUp(e) {
    if(this.isDragging) {
      const customEvent = new CustomEvent('dragend', {
        bubbles: false, 
        cancelable: true,
      });
  
      customEvent.rect = this.dragRects.rect;
      customEvent.parentRect = this.dragRects.parentRect;
      this.target.dispatchEvent(customEvent);
    }
    
    this.isDragging = false;
  }

  onMouseMove(e) {
    if(!this.isDragging) {
      return;
    }

    this.dragRects.deltaPointer.x = e.clientX - this.dragRects.pointer.x;
    this.dragRects.pointer.x = e.clientX;
    this.dragRects.rect.left += this.dragRects.deltaPointer.x;
    
    this.dragRects.deltaPointer.y = e.clientY - this.dragRects.pointer.y;
    this.dragRects.pointer.y = e.clientY;
    this.dragRects.rect.top += this.dragRects.deltaPointer.top;
    
    const customEvent = new CustomEvent('dragmove', {
      bubbles: false, 
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
    
    const boundingRect = this.target.getBoundingClientRect();
    const parentBoundingRect = this.target.parentElement.getBoundingClientRect();

    const rect = createRect(boundingRect);
    const parentRect = createRect(parentBoundingRect);

    this.dragRects = {
      pointer: {x: e.clientX, y: e.clientY},
      deltaPointer: {x: 0, y: 0},
      rect: {...rect},
      parentRect: {...parentRect}
    };

    const customEvent = new CustomEvent('dragstart', {
      bubbles: false, 
      cancelable: true,
    });
    customEvent.rect = rect;

    this.target.dispatchEvent(customEvent);
  }

  enter() {
    if(!this.isResizeActive) {
      this.isActivable = true;
      this.target.style.cursor = 'move';
    }
  }

  leave() {
    if(!this.isResizeActive) {
      this.reset();
    }
  }

  reset() {
    this.isDragging = false;
    this.isActivable = false;
    this.target.style.cursor = '';
  }
 
  onResizeEnter = (resizeTarget) => {
    if(!this.isDragging) {
      this.isResizeActive = true;
      this.reset();
    }
  }

  onResizeLeave = (resizeTarget) => {
    this.isResizeActive = false;
    if(this.isIn) {
      this.enter();
    } else {
      this.leave();
    }
  }

  mouseover = (e) => {
    e.stopPropagation();
    this.isIn = true;
    this.enter();
  }

  mouseout = (e) => {
    e.stopPropagation();
    if(!this.isDragging) {
      this.isIn = false;
      this.leave();
    }
    
  }
}

function createRect(bounding) {
  return {
    top: bounding.top,
    right: bounding.right,
    bottom: bounding.bottom,
    left: bounding.left,
    width: bounding.width,
    height: bounding.height,
  }
}