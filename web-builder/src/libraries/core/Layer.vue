<template>
  <div class="layer" ref="container">
    Layer
    <div class="toto"> </div>
    <!-- <slot name="builder-tools"/> -->
    <ToolVisualizer/>
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
.toto {
  background-color: red;
  width: 50px;
  height: 50px;
}

.layer {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
  border: 1px solid black;
  /* left: 120px; */
}
</style>

