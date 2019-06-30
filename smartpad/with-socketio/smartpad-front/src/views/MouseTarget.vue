<template>
  <div class="MouseControl" 
    v-laser="{ 
      visible: true,
      size: 8,
      maxPoints: 9,
      suppressRate: 36,
      onMove: onMove,
      onRelease: onReleave
    }"
    @click="onClick"
    @pointerdown="onClick"
  >
    ping: {{ ping }}
  </div>
</template>

<script>
import { throttle } from 'lodash-es';

export default {
  computed: {
    ping() {
      const { ping } = this.$store.state;
      return ping !== undefined ?  ping : '-';
    }
  },

  methods: {
    onReleave () {
      this.oldPointer = undefined;
    },

    onMove ({ pointer }) {
    },

    onClick ({ clientX, clientY }) {
      this.$socket.binary(false).emit('mouse:target_view', {
        left: clientX / window.innerWidth,
        top: clientY / window.innerHeight
      });
    }
  },

  beforeDestroy () {
    this.oldPointer = undefined; 
  }
}
</script>


<style lang="scss" scoped>
.MouseControl {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>



