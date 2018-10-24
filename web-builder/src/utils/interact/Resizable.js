import Interactable from './Interactable';

const MARGE_TOLERATE = 7;

export default class Resizable extends Interactable { 
  onMouseUp(e) {
    this.resizeLeave();
  }

  onMouseMove(e) {
    if(this.isResizing) {
      return this.resize(e);
    } 
    
    return this.handleEdges(e);
  }

  onMouseDown(e) {
    if(!this.isResizeAllowed()) {
      return;
    }
    
    this.isResizing = true;
    
    const boundingRect = this.target.getBoundingClientRect();
    const rect = {
      top: boundingRect.top,
      right: boundingRect.right,
      bottom: boundingRect.bottom,
      left: boundingRect.left,
      width: boundingRect.width,
      height: boundingRect.height,
    };

    this.resizeRects = {
      pointer: {x: e.clientX, y: e.clientY},
      deltaPointer: {x: 0, y: 0},
      start: {...rect},
      rect: {...rect},
      previous: {...rect},
      deltaRect: {
        left: 0, right : 0, width : 0,
        top : 0, bottom: 0, height: 0,
      },
    };

    this.target.style.pointerEvents = 'none';
    this.target.dispatchEvent(new CustomEvent('resizestart', {
      bubbles: false, 
      cancelable: true,
    }));
  }

  resizeLeave() {
    this.isResizing = false;

    removeResizer(this.id);
    
    if(hasResizer() || !this.isIn) {
      return;
    }
      
    this.isIn = false;
    this.target.style.pointerEvents = 'auto';
    this.$body.style.cursor = '';
    this.shareSignal.emit('resizeleave');
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
      .filter(([edge, marge]) => marge < MARGE_TOLERATE)
      .reduce((acc, [edge, marge]) => {
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

  resizeEnter() {
    if(!this.isIn) {
      this.isIn = true;
      this.shareSignal.emit('resizeenter');
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
      this.resizeRects.rect[from] = e[client];
      this.resizeRects.rect[dimTarget] = this.resizeRects.rect[dimTarget] + (delta * dir);
    })

    const customEvent = new CustomEvent('resizemove', {
      bubbles: false, 
      cancelable: true,
    });
    
    customEvent.rect = this.resizeRects.rect;
    customEvent.deltaRect = this.resizeRects.deltaRect;

    this.target.dispatchEvent(customEvent);
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