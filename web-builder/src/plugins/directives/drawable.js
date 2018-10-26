import { drawable } from '../../utils/interact';

export default {
  install(Vue) {
    Vue.directive('drawable', {
      bind(el, binding) {
        console.log('binding', binding);
        // drawable(el)

        /**
         *  drawable(el)
         *    .on('drawend', binding.value)
         **/ 
        /**
        binding.value ->
          store.addNode({
              width,
              height,
              left,
              top,
          }, pnode)
         **/ 
          
      }
    })
  }
}
