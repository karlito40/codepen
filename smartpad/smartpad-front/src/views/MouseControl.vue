<template>
  <div class="MouseControl" v-laser="{ 
    active: true,
    size: 8,
    maxPoints: 9,
    suppressRate: 36,
    onTick: onLaserUpdate
  }">
    lllalal
  </div>
</template>

<script>
let i = 0;
export default {
  methods: {
    onLaserUpdate ({ pointer }) {
      if (this.oldPointer) {
        const dtX = pointer.clientX - this.oldPointer.clientX;
        const dtY = pointer.clientY - this.oldPointer.clientY;
        
        const id = ++i;
        console.log('id', id)
        this.$socket.emit('mouse:move', {
          id,
          x: parseFloat(dtX.toFixed(2)),
          y: parseFloat(dtY.toFixed(2))
        });
      }

      this.oldPointer = pointer;
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



