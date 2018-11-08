import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Canvas',
  computed: {
    ...mapGetters(['currentTree'])
  },
  methods: {
    ...mapActions(['addNode']),
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
    renderTree(h, pnode) {
      if(!pnode) {
        return pnode;
      }
      
      if(Array.isArray(pnode)) {
        return pnode.map(n => this.renderTree(h, n));
      }
      
      if(typeof pnode !== 'object') {
        return pnode; // Simple Text
      }

      const options = pnode.component.options || {};
      const baseDirectives = [
        // { name: 'resizable', value: true, },
        // { name: 'draggable', value: true, },
        // { name: 'drawable', value: { onDrawEnd: this.onDrawEnd.bind(this) }, },
        { name: 'over-out', value: { class: 'in'}, },
      ];

      const style = {
        ...options.style,
        ...((pnode.data && pnode.data.visible === false) && { display: 'none' })
      };

      const directives = [...formatDirectives(options.directives), ...baseDirectives];
      
      return h(pnode.component.name, {
        ...options,
        style,
        class: ['pnode', options.class],
        attrs: { 
          ...options.attrs,
          'data-pid': pnode.id
        },
        on: this.$listeners,
        directives, 
      }, [
        h('ToolVisualizer', { props: { pnode }}),
        this.renderTree(h, pnode.children)
      ]);
    },
  },
  render(h) {
    return h('div', { 
      class: 'canvas', 
      style: styles.canvas, 
    }, this.renderTree(h, this.currentTree));
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

function formatDirectives(directivesOptions) {
  const res = [];
  
  if(directivesOptions) {
    for(let [name, value] of Object.entries(directivesOptions)) {
      res.push({name, value});
    }
  }

  return res;
}