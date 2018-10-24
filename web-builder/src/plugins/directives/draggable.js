import { draggable } from '../../utils/interact';
import { fromPosition, moveTarget } from './_gestureUtil';

export default {
  install(Vue) {
    Vue.directive('draggable', {
      inserted (el, binding) {
        update(el, binding);
      },
      update(el, binding){
        update(el, binding);
      },
    
      unbind(el, binding, vnode, oldVnode) {
        unset(el);
        // vnode.data.on.dragComplete();
      }
    });
  }
}

function unset(el) {
  draggable(el).unset();
}

function update(el, binding) {
  if(typeof binding.value !== "undefined" && !binding.value) {
    unset(el);
  }

  draggable(el)
    .on('dragstart', fromPosition)
    .on('dragmove', dragMoveListener);
}


function dragMoveListener(event) {
  const { target } = event;
  moveTarget(target, event.dx, event.dy);
}
