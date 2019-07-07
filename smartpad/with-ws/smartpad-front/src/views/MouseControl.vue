<template>
  <div 
    class="MouseControl" 
    @touchstart="onStart"
    @touchmove="onMove"
    @touchend="onEnd"
  >
    ping: {{ ping }}
  </div>
</template>

<script>
import { throttle } from 'lodash-es';

const dragOptions = {
  toleranceX: 5,
  toleranceY: 5,
  delayActivation: 300
};

const clickMs = 160;

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
      this.startAt = Date.now();
      
      this.dragTimeout = setTimeout(() => {
				this.$socket.send(JSON.stringify({
          subject: 'mouse:down',
          data: { }
        }));
        this.dragTimeout = null;
			}, dragOptions.delayActivation);
    },

    onEnd({ touches }) {
      this.preventDrag();

      if(touches.length) {
        return;
      }

      this.$socket.send(JSON.stringify({
        subject: 'mouse:up',
        data: { }
      }));  

      if(Date.now() - this.startAt < clickMs) {
        const send = () => {
          this.$socket.send(JSON.stringify({
            subject: 'mouse:click',
            data: { button: 'left', nbClick: this.nbClick }
          }));
          
          this.nbClick = 0;
          this.tapTimeout = null;
        };

        this.nbClick = this.nbClick ? this.nbClick + 1 : 1;
        clearTimeout(this.tapTimeout);
        if(this.nbClick === 1) {
          this.tapTimeout = setTimeout(send, 220)
        } else {
          send();
        }
      }
    },

    onMove(e) {
      e.preventDefault();
      if(this.dragTimeout) {
        this.checkDragDelay(e);
      }
      
      this.moveMouse(e);
    },

    preventDrag() {
      clearTimeout(this.dragTimeout)
      this.dragTimeout = null;
    },

    checkDragDelay(e) {
      if(e.touches.length > 1) {
        return this.preventDrag();
      }
      
      const touch = e.touches[0];
      const prevTouch = this.prevTouches.find((prevTouch) => prevTouch.identifier === touch.identifier);
      const deltaX = Math.abs(touch.clientX - prevTouch.clientX);
      const deltaY = Math.abs(touch.clientY - prevTouch.clientY);
      const dpi = window.devicePixelRatio || 1;
      
      if (
        deltaX >= Math.floor(dragOptions.toleranceX / dpi) 
        || deltaY >= Math.floor(dragOptions.toleranceY / dpi)
      ) {
        this.preventDrag();
      }
    },

    moveMouse: throttle(function (e) {
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
  },

  beforeDestroy() {
    this.preventDrag();
    clearTimeout(this.tapTimeout);
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



