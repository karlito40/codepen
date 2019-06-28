<template>
  <form class="FormMouseMove">
    <div class="form-group">
      <label>
        X
        <input
          v-model="mouse.x"
          type="number"
        />
      </label>
    </div>
    <div class="form-group">
      <label>
        Y
        <input
          v-model="mouse.y"
          type="number"
        />
      </label>
    </div>
  </form>
</template>

<script>
export default {
  data: () => ({
    mouse: {
      x: 0,
      y: 0
    }
  }),

  watch: {
    mouse: {
      deep: true,
      handler() {
        this.mouse.x = parseInt(this.mouse.x);
        this.mouse.y = parseInt(this.mouse.y);
        
        this.$socket.emit('mouse:move', {
          x: this.mouse.x,
          y: this.mouse.y
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

