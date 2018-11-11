import { draggable } from '../../utils/interact';
import { fromPosition, moveTarget, toPercent } from './_gestureUtil';

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
  if(typeof binding.value !== 'undefined' && !binding.value
    || typeof binding.value === 'object' && typeof binding.value.active !== 'undefined' && !binding.value.active
  ) {
    return unset(el);
  }
  
  const options = (typeof binding.value === 'object') ? binding.value : {};
  
  const interactable = draggable(el, { children: true, ...options })
    .on('dragstart', fromPosition)
    .on('dragmove', dragMoveListener);

  if(!options || !!options.toPercent) {
    interactable.on('dragend', toPercent);
  }
}


function dragMoveListener(event) {
  const { target } = event;
  moveTarget(target, event.dx, event.dy);
}
