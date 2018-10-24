import { drawable } from '../../utils/interact';

export default {
  install(Vue) {
    Vue.directive('drawable', {
      bind(el, binding) {
        console.log('binding', binding);
        // drawable(el)

        // store.addNode({
        //   width,
        //   height,
        //   left,
        //   top,
        // }, binding.value)
      }
    })
  }
}
