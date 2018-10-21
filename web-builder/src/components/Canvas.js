import { getCurrentPage } from '../fixtures/project';
import clone from 'clone';

const tree = clone(getCurrentPage().tree);

export default {
  name: 'Canvas',
  methods: {
    renderTree(h, node) {
      if(!node) {
        return node;
      }
      
      if(Array.isArray(node)) {
        return node.map(n => this.renderTree(h, n));
      }
      
      if(typeof node !== 'object') {
        return node;
      }

      return h(node.component, {
        ...node.options,
        on: this.$listeners,
      }, this.renderTree(h, node.children));
    },
  },
  render(h) {
    return h('v-app', { props: { light: true }, style: styles.app }, [
      h('div', { class: 'canvas', style: styles.canvas }, this.renderTree(h, tree))
    ])
  }
}

const styles = {
  app: {
    backgroundColor: '#303030',
  },
  canvas: {
    backgroundColor: 'white',
  }
}


