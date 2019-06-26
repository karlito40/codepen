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
import { throttle } from 'lodash-es';
// const { hostname } = window.location;
// const url = `ws://${hostname}:8081`
// const connection = new WebSocket(url)

// connection.onopen = () => {
//   console.log('connect open')
// }

// connection.onerror = (error) => {
//   console.log(`WebSocket error: ${error}`)
// }

// connection.onmessage = (e) => {
//   console.log(e.data)
// }

// connection.addEventListener('message', (msg) => {
//   connection.send(msg.data)
// })
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

    // onMove: throttle(function ({ pointer }) {
    onMove ({ pointer }) {
			if (this.oldPointer) {
        const dtX = pointer.clientX - this.oldPointer.clientX;
        const dtY = pointer.clientY - this.oldPointer.clientY;
        
        this.$socket.binary(false).emit('mouse:move', {
          ts: Date.now(),
          x: dtX,
          y: dtY
        });
      }

      this.oldPointer = pointer;
    // }, 20, { leading: true, trailing: true }),
    },

    onClick (e) {
      //e.preventDefault();
      //e.stopPropagation();
      console.log('click');
      // connection.send(Date.now()) 
      // this.$socket.emit('mouse:click', { ts: Date.now() });
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



