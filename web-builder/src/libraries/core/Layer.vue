<template>
  <div class="layer">
    <slot/>
  </div>
</template>

<script>
// import { EventEmitter } from 'events';

// const LayerEvent = new EventEmitter();

export default {
  name: 'Layer',
  props: {
    follow: {
      type: String,
      required: false,
    }
  },
  data() {
    return {
      activeResizable: false,
      activeDraggable: false
    }
  },
  watch: {
    onFlow(el) {
      if(this.follow && el.dataset.bid === this.follow) {
        // recalculate
        this.resize();
      }
    }
  },
  methods: {
    toggle() {
      this.activeDraggable = !this.activeDraggable;
      this.activeResizable = !this.activeResizable;
    },
    resize() {
      // LayerEvent.emit('flow', this.$refs.container);
    }
  },
  created() {
    // LayerEvent.addListener('flow', this.onFlow)
  },
  destroyed() {
    // LayerEvent.removeListener('flow', this.onFlow)
  }
}
</script>

<style scoped>

.layer {
  position: absolute;
  border: 1px dashed rgb(44, 168, 240)
}
</style>

