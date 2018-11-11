import Interactable from './Interactable';

export default class Draggable extends Interactable {
  constructor(target, options = {}) {
    super(target, options);

    this.dragBy = options.by ? target.querySelector(options.by) : this.target;
    if(!this.dragBy) {
      throw new Error(`Cannot drag by ${options.by || target} : element not found`);
    }
    
    this.dragBy.dataset.draggable = true;

    this.customListeners();
    
    // this.on(mouseInEvt, this.mouseIn);
    // this.on(mouseOutEvt, this.mouseOut);

    this.shareSignal.addListener('resizeenter', this.onResizeEnter);
    this.shareSignal.addListener('resizeleave', this.onResizeLeave);
  }

  customListeners({kill} = {}) {
    const callListenerEvent = (!kill) ? 'addEventListener' : 'removeEventListener';
    const mouseInEvt = 'mouseover';
    const mouseOutEvt = (!this.options.children) ? 'mouseout' : 'mouseleave';

    this.dragBy[callListenerEvent](mouseInEvt, this.mouseIn);
    this.dragBy[callListenerEvent](mouseOutEvt, this.mouseOut);
  }

  unset() {
    this.leave();
    
    this.customListeners({kill: true});

    this.shareSignal.removeListener('resizeenter', this.onResizeEnter);
    this.shareSignal.removeListener('resizeleave', this.onResizeLeave);

    return super.unset();
  }

  onMouseUp(e) { // eslint-disable-line
    if(this.isDragging) {
      this.userSelect(true);
      const customEvent = new CustomEvent('dragend', {
        bubbles: false, 
        cancelable: true,
      });
  
      customEvent.rect = this.dragRects.rect;
      customEvent.parentRect = this.dragRects.parentRect;
      this.target.dispatchEvent(customEvent);
    }
    
    this.isDragging = false;
    this.target.style.cursor = 'grab';
  }

  onMouseMove(e) { // eslint-disable-line
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

  onMouseDown(e) { // eslint-disable-line
    if(!this.isActivable) {
      return;
    }
    
    this.isDragging = true;
    
    this.userSelect(false);

    this.target.style.cursor = 'grabbing';
    
    const boundingRect = this.target.getBoundingClientRect();
    const parentBoundingRect = this.target.parentElement.getBoundingClientRect();

    const rect = createRect(boundingRect);
    const parentRect = createRect(parentBoundingRect);

    this.dragRects = {
      pointer: {x: e.clientX, y: e.clientY},
      deltaPointer: {x: 0, y: 0},
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
      this.target.style.cursor = 'grab';
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
 
  onResizeEnter = (resizeTarget) => { // eslint-disable-line
    if(!this.isDragging) {
      this.isResizeActive = true;
      this.reset();
    }
  }

  onResizeLeave = (resizeTarget) => { // eslint-disable-line
    this.isResizeActive = false;
    if(this.isIn) {
      this.enter();
    } else {
      this.leave();
    }
  }

  mouseIn = (e) => {
    e.stopPropagation();
    this.isIn = true;
    this.enter();
  }

  mouseOut = (e) => {
    e.stopPropagation();
    if(!this.isDragging) {
      this.isIn = false;
      this.leave();
    } 
  }

  userSelect(bool) {
    super.userSelect(bool);
    const addOrRemove = (!bool) ? 'add' : 'remove';
    [...document.body.querySelectorAll('iframe')].forEach(iframe => {
      iframe.classList[addOrRemove]('pointer-events-off')
    })
  }

  getNameRef() {
    return 'draggable';
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