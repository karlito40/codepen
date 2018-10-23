import resizable from './utils/interact/Resizable';
import draggable from './utils/interact/Draggable';
import Library from './libraries';

const Plugin = {
  install(Vue) {
    Vue.use(Library);
    
    Vue.directive('resizable', {
      inserted (el, binding) {
        updateResizable(el, binding);
      },
      update(el, binding){
        updateResizable(el, binding);
      },
      unbind(el, binding, vnode, oldVnode) {
        unsetResizable(el);
        // vnode.data.on.resizeComplete();
      }
    })

    Vue.directive('draggable', {
      inserted (el, binding) {
        // false
        updateDraggable(el, binding);
      },
      update(el, binding){
        updateDraggable(el, binding);
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
  draggable(el).unset();
}

function updateDraggable(el, binding) {
  draggable(el)
    .on('dragstart', fromPosition)
    .on('dragmove', dragMoveListener);
}

function unsetResizable(el) {
  resizable(el).unset();
}

function updateResizable(el, binding) {
  if(typeof binding.value !== "undefined" && !binding.value) {
    return unsetResizable(el);
  }

  resizable(el)
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