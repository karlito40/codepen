import { drawable } from '../../utils/interact';

export default {
  install(Vue) {
    Vue.directive('drawable', {
      inserted(el, binding) {
        drawable(el)
          .on('drawend', (e) => drawEndListener(e, binding));

      }
    })
  }
}

function drawEndListener(event, binding) {
  if(binding.value && binding.value.onDrawEnd) {
    binding.value.onDrawEnd(event, () => {
      event.freshEl.remove();    
    });
  }
}