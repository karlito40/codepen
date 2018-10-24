import Library from '../libraries';
import overOut from './directives/over-out';
import draggable from './directives/draggable';
import resizable from './directives/resizable';
import drawable from './directives/drawable';

export default {
  install(Vue) {
    Vue.use(Library);
    Vue.use(overOut);
    Vue.use(draggable);
    Vue.use(resizable);
    Vue.use(drawable);
  }
};

