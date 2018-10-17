import { TimelineMax, TimelineLite } from 'gsap/all';

export default {
  name: 'Timeline',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    setup: {
      type: Function,
      required: true
    },
    keep: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isAnimating: false
    }
  },
  watch: {
    show() {
      this.isAnimating = true;
      this.$nextTick(this.animate);
    },
  },
  methods: {
    animate() {
      this.isAnimating = true;

      const done = () => {
        this.isAnimating = false;
      }

      if(!this.tl) {
        this.tl = this.setup(this.$refs.container);
      }

      if(this.show) {
        this.$emit('enter');

        this.tl
          .play()
          .eventCallback('onComplete', () => {
            this.$emit('enterComplete');
            done();
          });
      } else {
        this.$emit('leave');

        this.tl
          .reverse()
          .eventCallback('onReverseComplete', () => {
            this.tl = null;
            done();
            this.$emit('leaveComplete');
          });
      }
    }
  },
  mounted() {
    if(this.show) {
      this.animate();
    }
  },
  render(h) {
    const isShown = (this.keep || this.show || this.isAnimating);
    return isShown && h('div', {ref: 'container'}, this.$slots.default);
  }
}
