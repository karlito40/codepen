import { resizable } from '../../utils/interact';
import { fromPosition, moveTarget, toPercent } from './_gestureUtil';

export default {
  install(Vue) {
    Vue.directive('resizable', {
      inserted (el, binding) {
        update(el, binding);
      },
      update(el, binding){
        update(el, binding);
      },
      unbind(el, binding, vnode, oldVnode) { // eslint-disable-line
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
    return unset(el);
  }

  resizable(el)
    .on('resizestart', fromPosition)
    .on('resizemove', resizeMoveListener)
    .on('resizeend', toPercent);
}


function resizeMoveListener(event) {
  const { target } = event;

  target.style.width  = event.rect.width + 'px';
  target.style.minHeight = event.rect.height + 'px';

  moveTarget(target, event.deltaRect.left, event.deltaRect.top);
}
