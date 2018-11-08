<template>
  <div :class="['tool-visualizer', {
    'force-display': isHighlighting
  }]">
    <div class="pnode-title">{{pnode.title}}</div>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="left"
      :open-on-hover="hover"
      :transition="transition"
    >
      <v-btn
        slot="activator"
        v-model="fab"
        color="blue darken-2"
        dark
        small
        fab
      >
        <v-icon>add</v-icon>
      </v-btn>
      
      <v-btn
        fab
        dark
        small
        color="red"
      >
        <v-icon>delete</v-icon>
      </v-btn>
      
      <v-btn
        v-for="(tool, index) in tools" :key="index"
        fab
        dark
        small
        :color="(tool.category === 'component') ? 'blue' : 'orange'"
        @click="pick(tool)"
      >
        <v-icon>{{tool.icon}}</v-icon>
      </v-btn>

    </v-speed-dial>
  </div>
</template>

<script>
import clone from 'clone';
import withTools from '../../fixtures/tools';

const tools = clone(withTools).reverse();

export default {
  name: 'ToolVisualizer',
  props: {
    pnode: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      direction: 'top',
      fab: false,
      hover: true,
      right: true,
      bottom: true,
      transition: 'slide-y-reverse-transition',
      tools
    };
  },
  computed: {
    isHighlighting() {
      const { component } = this.pnode;
      return component.data && component.data.highlight;
    }
  },
  methods: {
    pick(tool) {
      if(tool.action) {
        tool.action(this.pnode);
      } else {
        this.$store.dispatch('addFlash', 'This tool is not available yet');
      }
    }
  }
}
</script>

<style scoped>
.tool-visualizer {
  font-family: Roboto, sans-serif;
  pointer-events: auto;
}

.tool-visualizer.force-display {
  display: block !important;
}

.pnode-title {
  position: absolute;
  top: -1px;
  left: -1px;
  padding: 5px 10px;
  background-color: rgb(221, 238, 248);
  border: 1px solid rgb(44, 168, 240);
  color: rgb(44, 168, 240);
}
>>> .v-speed-dial {
  position: absolute;
  z-index: 9999;
  bottom: 0;
  right: 0;
  transform: translate(50%, 50%);
}

.group {
  position: relative;
}
</style>

