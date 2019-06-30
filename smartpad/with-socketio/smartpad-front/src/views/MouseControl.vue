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
    @touchstart="onClick"
  >
    ping: {{ ping }}
  </div>
</template>

<script>
export default {
  computed: {
    ping() {
      const { ping } = this.$store.state;
      return ping !== undefined ? ping : '-';
    }
  },

  methods: {
    onReleave () {
      this.oldPointer = undefined;
    },

    onMove ({ pointer }) {
			if (this.oldPointer) {
        const dtX = pointer.clientX - this.oldPointer.clientX;
        const dtY = pointer.clientY - this.oldPointer.clientY;
        
        this.$socket.binary(false).emit('mouse:move', {
          x: dtX,
          y: dtY
        });
      }

      this.oldPointer = pointer;
    },

    onClick () {
      this.$socket.emit('mouse:click');
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



