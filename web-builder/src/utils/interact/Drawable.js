import Interactable from './Interactable';

export default class Drawable extends Interactable {
  constructor(target, options = {}) {
    super(target, options);
    this.$body.style.cursor = 'crosshair';
  }

  onMouseUp(e) { // eslint-disable-line
    if(this.isDrawing) {
      const customEvent = new CustomEvent('drawend', {
        bubbles: false, 
        cancelable: true,
      });
  
      customEvent.rect = this.drawRects.rect;
      customEvent.freshEl = this.drawRects.el;
      this.target.dispatchEvent(customEvent);
      
      this.userSelect(true);
    }
    this.isDrawing = false;
  }

  onMouseMove(e) { // eslint-disable-line
    if(!this.isDrawing) {
      return;
    }

    const relativeCoord = {
      x: e.clientX - this.drawRects.targetRect.left,
      y: e.clientY - this.drawRects.targetRect.top
    };

    this.drawRects.rect.width = relativeCoord.x - this.drawRects.rect.left;
    this.drawRects.rect.height = relativeCoord.y - this.drawRects.rect.top;
    
    this.drawRects.el.style.width = this.drawRects.rect.width + 'px';
    this.drawRects.el.style.height = this.drawRects.rect.height + 'px';
  }

  onMouseDown(e) {
    this.isDrawing = true;
    
    this.userSelect(false);

    const targetRect = createRect(this.target.getBoundingClientRect());

    const relativeCoord = {
      x: e.clientX - targetRect.left,
      y: e.clientY - targetRect.top
    };

    const el = document.createElement('div');
    el.className = 'drawing-placeholder';
    el.style.border = '1px solid blue';
    el.style.position = 'absolute';
    el.style.left = relativeCoord.x + 'px';
    el.style.top = relativeCoord.y + 'px';

    this.target.appendChild(el);

    const rect = { 
      left: relativeCoord.x, 
      top: relativeCoord.y,
      width: 0,
      height: 0
    };

    this.drawRects = {
      rect,
      targetRect: { ...targetRect },
      el
    };
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