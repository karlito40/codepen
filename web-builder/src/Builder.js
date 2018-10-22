import interact from 'interactjs';
import Library from './libraries';

const Plugin = {
  install(Vue) {
    Vue.use(Library);

    Vue.directive('resize', {
      bind (el, binding) {
        // false
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

    Vue.directive('drag', {
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
  }
}

export default Plugin;


function unsetDraggable(el) {
  interact(el)
    .draggable(false)
    .off('dragstart', initPosition)
    .off('dragmove', dragMoveListener);
}

function draggable(el, binding) {
  if(typeof binding.value !== "undefined" && !binding.value) {
    return unsetDraggable(el);
  }

  const draggableOptions = binding.value || {
    restrict: {
      restriction: 'parent',
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
  };

  interact(el)
    .draggable(draggableOptions)
    .on('dragstart', initPosition)
    .on('dragmove', dragMoveListener)
}

function unsetResizable(el) {
  interact(el)
      .resizable(false)
      .off('resizestart', initPosition)
      .off('resizemove', resizeMoveListener);
}

function resizable(el, binding) {
  if(typeof binding.value !== "undefined" && !binding.value) {
    return unsetResizable(el);
  }

  const restrictOptions = binding.value || {
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
    .on('resizestart', initPosition)
    .on('resizemove', resizeMoveListener);
}

function dragMoveListener(event) {
  const { target } = event;
  
  moveTarget(target, event.dx, event.dy);
}

function initPosition(event) {
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