import Interactable from './Interactable';

export default function resizable(target, options = {}) {
  return new Resizable(target, options);
}

const MARGE_TOLERATE = 7;

class Resizable extends Interactable {
  onMouseUp(e) {
    this.target.style.pointerEvents = 'auto';
    this.isResizing = false;
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
      bubbles: true, 
      cancelable: true,
    }));
  }

  handleEdges = (e) => {
    this.$body.style.cursor = '';
    const rect = this.target.getBoundingClientRect();

    const edges = {
      top: Math.abs(e.clientY - rect.top),
      right: Math.abs(e.clientX - rect.right),
      bottom: Math.abs(e.clientY - rect.bottom),
      left: Math.abs(e.clientX - rect.left),
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
      return;
    }

    if(this.getTotalAxis() == 1) {
      this.$body.style.cursor = this.axis.x ? 'col-resize' : 'row-resize';
    } else if(
      this.axis.x.from === 'left' && this.axis.y.from === 'top'
      || this.axis.x.from === 'right' && this.axis.y.from === 'bottom'
    ) {
      this.$body.style.cursor = 'nwse-resize';
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
      bubbles: true, 
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