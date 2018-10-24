import { resizable } from '../../utils/interact';
import { fromPosition, moveTarget } from './_gestureUtil';

export default {
  install(Vue) {
    Vue.directive('resizable', {
      inserted (el, binding) {
        update(el, binding);
      },
      update(el, binding){
        update(el, binding);
      },
      unbind(el, binding, vnode, oldVnode) {
        unset(el);
        // vnode.data.on.resizeComplete();
      }
    })
  }
}


function unset(el) {
  resizable(el).unset();
}

function update(el, binding) {
  if(typeof binding.value !== "undefined" && !binding.value) {
    unset(el);
  }

  resizable(el)
    .on('resizestart', fromPosition)
    .on('resizemove', resizeMoveListener);
}


function resizeMoveListener(event) {
  const { target } = event;

  target.style.width  = event.rect.width + 'px';
  target.style.height = event.rect.height + 'px';

  moveTarget(target, event.deltaRect.left, event.deltaRect.top);
}