import { getCurrentPage } from '../fixtures/workspace';
import clone from 'clone';

const tree = clone(getCurrentPage().tree);

export default {
  name: 'Canvas',
  methods: {
    onMovingContent() {
      /**
       * 
       * NodeTree with follow props must be reposition 
       * depending of the following content
       * 
       * while browsingTree
       *  if node.follow
       *    followingNode = getNode(node.follow)
       *    node.style.top = followingNode.rect.bottom + oldGate
       *  
       * forbidden circular dependencies
       *  content -> follow header
       *    header -> follow content 
       * 
       */

    },
    onFreshContent() {
      /**
       * Root must be recalculate on dynamical content (fetch, etc...)
       * totalHeight = firstChilds
       * newHeight = totalHeight + (totalHeight - oldHeight) // keep distance
       * tree[0].options.style.height = totalHeight + 'px'
       * tree[0].options.style.height = newHeight + 'px'
       */
    },
    renderTree(h, node) {
      if(!node) {
        return node;
      }
      
      if(Array.isArray(node)) {
        return node.map(n => this.renderTree(h, n));
      }
      
      if(typeof node !== 'object') {
        return node; // Simple Text
      }

      const options = node.options || {};
      const directives = [
        { name: 'resizable', value: true, },
        { name: 'draggable', value: true, },
        { name: 'drawable', value: node.id, },
      ];
      
      return h(node.component, {
        ...options,
        class: 'node-component ' + (options.class || ''),
        attrs: { 
          ...options.attrs,
          'data-bid': node.id
        },
        on: this.$listeners,
        directives: [
          ...(options.directives || []), 
          ...directives
        ], 
      }, this.renderTree(h, node.children));
    },
  },
  render(h) {
    return h('div', { 
      class: 'canvas', 
      style: styles.canvas, 
    }, this.renderTree(h, tree));
  }
}

const styles = {
  app: {
    backgroundColor: '#303030',
  },
  canvas: {
    backgroundColor: 'white',
    height: '1000px',
  }
}


