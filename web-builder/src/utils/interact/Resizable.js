import Interactable from './Interactable';

const MARGE_TOLERATE = 7;

export default class Resizable extends Interactable { 
  unset() {
    this.resizeLeave();
    super.unset();
  }

  onMouseUp(e) { // eslint-disable-line
    this.resizeLeave();
  }

  onMouseMove(e) { // eslint-disable-line
    if(this.isResizing) {
      return this.resize(e);
    } 
    
    return this.handleEdges(e);
  }

  onMouseDown(e) { // eslint-disable-line
    if(!this.isResizeAllowed()) {
      return;
    }
    
    this.isResizing = true;

    this.userSelect(false);
    
    const boundingRect = this.target.getBoundingClientRect();
    const parentBoundingRect = this.target.parentElement.getBoundingClientRect();

    const rect = createRect(boundingRect);
    const parentRect = createRect(parentBoundingRect);

    this.resizeRects = {
      pointer: {x: e.clientX, y: e.clientY},
      deltaPointer: {x: 0, y: 0},
      start: {...rect},
      parentRect: {...parentRect},
      rect: {...rect},
      previous: {...rect},
      deltaRect: {
        left: 0, right : 0, width : 0,
        top : 0, bottom: 0, height: 0,
      },
    };

    this.target.style.pointerEvents = 'none';
    
    const customEvent = new CustomEvent('resizestart', {
      bubbles: false, 
      cancelable: true,
    });

    customEvent.rect = this.resizeRects.rect;
    this.target.dispatchEvent(customEvent);
  }

  resizeLeave() {
    if(this.isResizing) {
      this.userSelect(true);
      const customEvent = new CustomEvent('resizeend', {
        bubbles: false, 
        cancelable: true,
      });
  
      customEvent.rect = this.resizeRects.rect;
      customEvent.parentRect = this.resizeRects.parentRect;
      this.target.dispatchEvent(customEvent);
    }
    
    this.isResizing = false;

    removeResizer(this.id);
    
    if(hasResizer() || !this.isIn) {
      return;
    }
    
    this.isIn = false;
    this.target.style.pointerEvents = 'auto';
    this.$body.style.cursor = '';
    this.shareSignal.emit('resizeleave', this.target);
  }

  resizeEnter() {
    if(!this.isIn) {
      this.isIn = true;
      this.shareSignal.emit('resizeenter', this.target);
    }

    addResizer(this.id);
    
    if(this.getTotalAxis() == 1) {
      this.$body.style.cursor = this.axis.x ? 'col-resize' : 'row-resize';
    } else if(
      this.axis.x.from === 'left' && this.axis.y.from === 'top'
      || this.axis.x.from === 'right' && this.axis.y.from === 'bottom'
    ) {
      this.$body.style.cursor = 'nwse-resize';
      this.target.style.cursor = 'nwse-resize';
    } else {
      this.$body.style.cursor = 'nesw-resize';
    }
  }

  resize(e) {
    this.resizeRects.previous = {...this.resizeRects.rect};

    Object.entries(this.axis).forEach(([axe, {from}]) => {
      const dir = (from === 'left' || from === 'top') ? -1 : 1;
      const client = `client${axe.toUpperCase()}`;
      const dimTarget = (axe === 'x') ? 'width' : 'height';

      this.resizeRects.deltaPointer[axe] = e[client] - this.resizeRects.pointer[axe];
      this.resizeRects.pointer[axe] = e[client];

      const delta = this.resizeRects.deltaPointer[axe];
      this.resizeRects.deltaRect[from] = delta;
      this.resizeRects.rect[from] += delta;
      this.resizeRects.rect[dimTarget] = this.resizeRects.rect[dimTarget] + (delta * dir);
    });

    const customEvent = new CustomEvent('resizemove', {
      bubbles: false, 
      cancelable: true,
    });
    
    customEvent.rect = this.resizeRects.rect;
    customEvent.deltaRect = this.resizeRects.deltaRect;
    this.target.dispatchEvent(customEvent);
  }


  handleEdges = (e) => {
    const rect = this.target.getBoundingClientRect();

    const axisBound = {
      x: (e.clientY > rect.top - MARGE_TOLERATE && e.clientY < rect.bottom + MARGE_TOLERATE),
      y: (e.clientX > rect.left - MARGE_TOLERATE && e.clientX < rect.right + MARGE_TOLERATE)
    }

    const edges = {
      ...(axisBound.y && {top: Math.abs(e.clientY - rect.top)}),
      ...(axisBound.y && {bottom: Math.abs(e.clientY - rect.bottom)}),
      ...(axisBound.x && {right: Math.abs(e.clientX - rect.right)}),
      ...(axisBound.x && {left: Math.abs(e.clientX - rect.left)}),
    };

    const axisTargets = Object.entries(edges)
      .filter(([edge, marge]) => marge < MARGE_TOLERATE) // eslint-disable-line
      .reduce((acc, [edge, marge]) => { // eslint-disable-line
        const axis = (['top', 'bottom'].indexOf(edge) !== -1) ? 'y' : 'x';
        acc[axis] = {from: edge};
        return acc;
      }, {});
    
    this.setAxis(axisTargets);
    
    if(!this.isResizeAllowed()) {
      this.resizeLeave();
    } else {
      this.resizeEnter();
    }
  }


  setAxis(target) {
    this.axis = target;
  }

  getTotalAxis() {
    return this.axis ? Object.keys(this.axis).length : 0;
  }

  isResizeAllowed() {
    return this.getTotalAxis();
  }

  getNameRef() {
    return 'resizable';
  }

}

const store = {};

function hasResizer() {
  return Object.values(store).some(v => v.cursor);
}

function removeResizer(id) {
  store[id] = {cursor: false};
}

function addResizer(id) {
  store[id] = {cursor: true};
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