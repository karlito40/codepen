import Timeline from './Timeline';
import { TweenMax } from 'gsap/all';
import { cloneVNode } from './VueHelper';

export default {
  name: 'SourcePointTimeline',
  components: { Timeline },
  props: { ...Timeline.props },
  methods: {
    setupHandler(sourcePoint) {
      const fromEl = this.$refs.container.firstChild;
      const fromRect = fromEl.getBoundingClientRect();

      TweenMax.set(sourcePoint.firstChild, { 
        minHeight: '100%', 
        minWidth: '100%',
        height: 'auto',
      });
      
      TweenMax.set(sourcePoint, {
        position: 'fixed',
        zIndex: 9999,
        left: fromRect.left, 
        top: fromRect.top, 
        width: fromRect.width, 
        height: fromRect.height,
        overflow: 'auto',
      });

      return this.setup(sourcePoint, fromRect);
    }
  },
  render(h) {
    return h('div', { ref: 'container' }, [
      this.$slots.default,
      h('Timeline', { 
        props: { ...this.$props, setup: this.setupHandler }, 
        class: 'source-point',
        on: this.$listeners
      }, cloneVNode(this.$slots.default, h))
    ]);
  }
}