<template>
  <div class="VirtualPad" 
    v-laser="{ 
      visible: true,
      size: 8,
      maxPoints: 9,
      suppressRate: 36,
      onMove: onMove,
      onRelease: stop
    }"
  >
    VirtualPad
  </div>
</template>

<script>
export default {
  methods: {
    onMove ({ pointer }) {
      this.oriPointer = this.oriPointer || pointer; 
      const pxSizeFrame = 7;
      const dtX = pointer.clientX - this.oriPointer.clientX;
      const dtY = pointer.clientY - this.oriPointer.clientY;
      const velocityX = ~~(dtX / pxSizeFrame);
      const velocityY = ~~(dtY / pxSizeFrame);
      
      this.$socket.emit('mouse:velocity', {
        x: velocityX,
        y: velocityY
      });
    },

    stop () {
      this.oriPointer = undefined;
      this.$socket.emit('mouse:velocity', {
        x: 0,
        y: 0
      });
    }
  },

  beforeDestroy () {
    this.stop();
  }
}
</script>


<style lang="scss" scoped>
.VirtualPad {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
</style>



