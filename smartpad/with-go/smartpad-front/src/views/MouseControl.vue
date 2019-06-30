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
const { hostname } = window.location;
const url = `ws://${hostname}:8081`
const socket = new WebSocket(url)
socket.onopen = () => {
  console.log('socket open')
}

socket.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

socket.onclose = (error) => {
  console.log(`WebSocket closed`, error)
}

socket.onmessage = (e) => {
  console.log('onmessage', e.data);
}

socket.addEventListener('message', (msg) => {
  socket.send(msg.data)
})

export default {
  computed: {
    ping() { 
      const { ping } = this.$store.state;
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
        
        socket.send(JSON.stringify({
          subject: 'mouse:move',
          data: { x: dtX, y: dtY }
        }));
      }

      this.oldPointer = pointer;
    },

    onClick () {
      //e.preventDefault();
      //e.stopPropagation();
      console.log('click');
      // socket.send(Date.now()) 
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



