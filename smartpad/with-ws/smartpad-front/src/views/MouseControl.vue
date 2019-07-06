<template>
  <div 
    class="MouseControl" 
    @touchstart="onStart"
    @touchmove="onMove"
  >
    ping: {{ ping }}
  </div>
</template>

<script>
import { throttle } from 'lodash-es';

export default {
  computed: {
    ping() { 
      const { ping } = this.$store.state;
      return ping !== undefined ? ping : '-';
    }
  },

  methods: {
    onStart(e) {
      e.preventDefault();
      this.prevTouches = [...e.touches];
    },

    onMove: throttle(function (e) {
      e.preventDefault();
      const touches = [...e.touches];
      const bindDistance = (touch) => {
        const prevTouch = this.prevTouches.find((prevTouch) => prevTouch.identifier === touch.identifier);
        let delta;
        if(prevTouch) {
          const dx = touch.clientX - prevTouch.clientX;
          const dy = touch.clientY - prevTouch.clientY;
          const distance = Math.hypot(dx, dy);
          delta = { dx, dy, distance };
        }

        return { ...touch, ...delta };
      };

      const greaterMove = touches
        .map(bindDistance)
        .filter((touch) => touch.distance)
        .sort((a, b) => b.distance - a.distance)[0];
      
      if(greaterMove) {
        const { dx, dy } = greaterMove;
        const subject = touches.length === 1 ? 'mouse:move' : 'mouse:scroll'; 
        this.$socket.send(JSON.stringify({
          subject,
          data: { x: dx, y: dy }
        }));
      }
      
      this.prevTouches = touches;
    }, 3, { trailing: true }),
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



