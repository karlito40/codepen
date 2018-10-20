<template>
  <div class="rules" ref="container">

    <div v-for="dir in ['horizontal', 'vertical']" 
      class="rule" 
      :class="dir" 
      :ref="dir" 
      :key="dir"
      :style="stylingRule(dir)"
    >
      <div class="px" v-for="px in $data[dir].range" :key="px">
        <div class="indicator"></div>
        <div class="text">{{px}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const WITH_INTERVAL = 20;
export default {
  name: 'Rule',
  data() {
    return {
      vertical: {range: [], padding: 0, size: 0},
      horizontal: {range: [], padding: 0, size: 0},
    }
  },
  methods: {
    stylingRule(dir) {
      let paddingTarget = 'paddingLeft';
      let dimTarget = 'width';

      if(dir === 'vertical') {
        paddingTarget = 'paddingTop';
        paddingTarget = 'paddingTop';
        dimTarget = 'height';
      }

      return {
        [paddingTarget]: this[dir].padding + 'px',
        [dimTarget]: this[dir].size + 'px',
      }
    },
    createInterval([startAt, endAt], size) {
      const previous = Array(Math.abs(startAt))
        .fill()
        .map((v, index) => -index)
        .filter(px => px && (px % WITH_INTERVAL) === 0)
        .reverse();

      const next = Array(Math.abs(endAt))
        .fill()
        .map((v, index) => index)
        .filter(px => (px % WITH_INTERVAL) === 0);

      const skipPixel = Math.abs(startAt) - Math.abs(previous[0]);
      return {range: [...previous, ...next], padding: skipPixel, size};
    }
  },
  mounted() {
    const parent = this.$refs.container.parentElement;
    const style = window.getComputedStyle(parent);
    const paddingLeft = parseInt(style.paddingLeft, 10);
    const paddingTop = parseInt(style.paddingTop, 10);
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10)

    this.horizontal = this.createInterval([-paddingLeft, width - paddingLeft], width);
    this.vertical = this.createInterval([-paddingTop, height - paddingTop], height);
  }
}
</script>

<style lang="scss" scoped>
$WITH_INTERVAL: 20px;
$INDICATOR_SIZE: 35%;
$RULE_SIZE: 20px;

.rule {
  color: black;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  font-size: 8px;
  overflow: hidden;
  background: #b9b6b6;

}

  .rule.horizontal {
    width: 100%;
    height: $RULE_SIZE;
  }

  .rule.vertical {
    width: $RULE_SIZE;
    flex-direction: column;
  }

.px {
  flex-shrink: 0;
  flex-grow: 0;
}

  .horizontal .px {
    margin-right: $WITH_INTERVAL;
    height: 100%;
    width: 1px;
  }

  .horizontal .px .indicator {
    height: $INDICATOR_SIZE;
    width: 100%;
    background-color: black;
  }

  .horizontal .px .text {
    pointer-events: none;
    position: absolute;
    bottom: 0px;
    width: 50px;
    margin-left: -25px;
    text-align: center;
  }

  .vertical .px {
    margin-bottom: $WITH_INTERVAL;
    height: 1px;
    width: 100%;
  }

  .vertical .px .indicator {
    width: $INDICATOR_SIZE;
    height: 100%;
    background-color: black;
  }

  .vertical .px .text {
    pointer-events: none;
    position: absolute;
    text-align: center;
    right: 10px;
    width: 50px;
    margin-top: -25px;
    text-align: center;
    transform: rotate(-90deg);
    transform-origin: 100% 0;
  }
</style>


