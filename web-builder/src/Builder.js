import interact from 'interactjs';
import Library from './libraries';

const Plugin = {
  install(Vue) {
    Vue.use(Library);
    
    Vue.directive('resizable', {
      bind (el, binding) {
        resizable(el, binding);
      },
      update(el, binding){
        resizable(el, binding);
      },
      unbind(el, binding, vnode, oldVnode) {
        unsetResizable(el);
        // vnode.data.on.resizeComplete();
      }
    })

    Vue.directive('draggable', {
      bind (el, binding) {
        // false
        draggable(el, binding);
      },
      update(el, binding){
        draggable(el, binding);
      },

      unbind(el, binding, vnode, oldVnode) {
        unsetDraggable(el);
        // vnode.data.on.dragComplete();
      }
    });

    Vue.directive('drawable', (el, binding) => {})
  }
}

export default Plugin;


function unsetDraggable(el) {
  interact(el)
    .draggable(false)
    .off('dragstart', fromPosition)
    .off('dragmove', dragMoveListener);
}

function draggable(el, binding) {
  if(typeof binding.value !== "undefined" && !binding.value) {
    return unsetDraggable(el);
  }

  // const draggableOptions = binding.value || {
  const draggableOptions = {
    restrict: {
      restriction: 'parent',
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
  };
  
  interact(el)
    .draggable(draggableOptions)
    .on('dragstart', fromPosition)
    .on('dragmove', dragMoveListener)
}

function unsetResizable(el) {
  interact(el)
      .resizable(false)
      .off('resizestart', fromPosition)
      .off('resizemove', resizeMoveListener);
}

function resizable(el, binding) {
  if(typeof binding.value !== "undefined" && !binding.value) {
    return unsetResizable(el);
  }

  // const restrictOptions = binding.value || {
  const restrictOptions = {
    restrictEdges: {
      outer: 'parent',
      endOnly: true,
    },
    restrictSize: {
      min: { width: 100, height: 50 },
    },
  };

  interact(el)
    .resizable({
      edges: { left: true, right: true, bottom: true, top: true },
      ...restrictOptions
    })
    .on('resizestart', fromPosition)
    .on('resizemove', resizeMoveListener);
}

function dragMoveListener(event) {
  const { target } = event;
  moveTarget(target, event.dx, event.dy);
}

function fromPosition(event) {
  const { target } = event;
  const { top, left } = window.getComputedStyle(target);

  target.setAttribute('data-top', parseFloat(top));
  target.setAttribute('data-left', parseFloat(left));
}

function moveTarget(target, dx, dy) {
  let top = (parseFloat(target.getAttribute('data-top')) || 0);
  let left = (parseFloat(target.getAttribute('data-left')) || 0);

  left += dx;
  top += dy;

  target.style.left = left + 'px';
  target.style.top = top + 'px';

  target.setAttribute('data-left', left);
  target.setAttribute('data-top', top);
}

function resizeMoveListener(event) {
  const { target } = event;

  target.style.width  = event.rect.width + 'px';
  target.style.height = event.rect.height + 'px';

  moveTarget(target, event.deltaRect.left, event.deltaRect.top);
}