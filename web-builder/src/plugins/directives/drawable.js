import { drawable } from '../../utils/interact';

export default {
  install(Vue) {
    Vue.directive('drawable', {
      inserted(el, binding) {
        update(el, binding);
        
      },
      update(el, binding) {
        update(el, binding);
      },
      unbind(el) {
        unset(el);
      }
    })
  }
}

function update(el, binding) {
  if(typeof binding.value !== 'undefined' && !binding.value
    || typeof binding.value === 'object' && typeof binding.value.active !== 'undefined' && !binding.value.active
  ) {
    return unset(el);
  }

  drawable(el).on('drawend', (e) => drawEndListener(e, binding));
}

function unset(el) {
  drawable(el).unset();
}

function drawEndListener(event, binding) {
  if(binding.value && binding.value.onDrawEnd) {
    binding.value.onDrawEnd(event, () => {
      event.freshEl.remove();    
    });
  }
}