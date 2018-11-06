<template>
  <div class="rules">
    <div v-for="dir in ['horizontal', 'vertical']" 
      class="rule" 
      :class="dir" 
      :ref="dir" 
      :key="dir"
      :style="$data[dir].style"
    >
      <div class="px" 
        v-for="indicator in $data[dir].indicators" 
        :key="indicator.content"
        :style="indicator.style"
      >
        <div class="indicator"></div>
        <div class="text">{{indicator.content}}</div>
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
      vertical: {indicators: [], style: {}},
      horizontal: {indicators: [], style: {}},
    }
  },
  methods: {
    stylingRule(dir) {
      let paddingTarget = 'paddingLeft';
      let dimTarget = 'width';

      if(dir === 'vertical') {
        paddingTarget = 'paddingTop';
        dimTarget = 'height';
      }

      return {
        [paddingTarget]: this[dir].padding + 'px',
        [dimTarget]: this[dir].size + 'px',
      }
    },
    createInterval(dir, [startAt, endAt], size) {
      const previous = Array(Math.abs(startAt))
        .fill()
        .map((v, index) => -index)
        .filter(px => px && (px % WITH_INTERVAL) === 0)
        .reverse();

      const next = Array(Math.abs(endAt))
        .fill()
        .map((v, index) => index)
        .filter(px => (px % WITH_INTERVAL) === 0);

      const padding = Math.abs(startAt) - Math.abs(previous[0]);

      let positionTarget = 'left';
      let sizeTarget = 'width';
      if(dir === 'vertical') {
        positionTarget = 'top';
        sizeTarget = 'height';
      }

      const indicators = [...previous, ...next].map((indicator, i) => {
        return {
          content: indicator,
          style: {
            [positionTarget]: (i * WITH_INTERVAL + padding) + 'px'
          }
        }
      });

      

      return {
        indicators, 
        style: {
          ...this.getBaseStyle(dir),
          [sizeTarget]: size + 'px',
        }
      };
    },
    getBaseStyle(dir) {
      let style = {};
      if(dir === 'horizontal') {
        const origin = this.getParentOrigin();
        style = {
          left: origin.left + 'px', 
          top: origin.top + 'px', 
          position: 'fixed'
        };
      }

      return style;
    },
    getParentOrigin() {
      const parentRect = this.$el.parentElement.getBoundingClientRect();
      
      return {
        left: parentRect.left,
        top: parentRect.top,
      };
    }
  },
  mounted() {
    const parent = this.$el.parentElement;
    const style = window.getComputedStyle(parent);
    const paddingLeft = parseInt(style.paddingLeft, 10);
    const paddingTop = parseInt(style.paddingTop, 10);
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10)

    this.horizontal = this.createInterval('horizontal', [-paddingLeft, width - paddingLeft], width);
    this.vertical = this.createInterval('vertical', [-paddingTop, height - paddingTop], height);

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
  font-size: 8px;
  overflow: hidden;
  background: #ffe0ad;

}

  .rule.horizontal {
    width: 100%;
    height: $RULE_SIZE;
  }

  .rule.vertical {
    width: $RULE_SIZE;
  }

.px { position: absolute; }

  .horizontal .px {
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


