<template>
  <div class="node-settings-component">
    <v-layout align-center class="py-1">
      <v-flex>
        <div class="subheading px-3">{{pnode.title}}</div>
      </v-flex>
      <v-btn small icon slot="activator" @click="close">
        <v-icon>close</v-icon>
      </v-btn>
    </v-layout>

    <component :key="name" v-for="(section, name) in sections" :is="section.component" v-model="section.model"/>
  </div>
  
</template>

<script>
import LayoutSection from './LayoutSection';
import StyleSection from './StyleSection';
import Popup from '../Popup';

export default {
  name: 'NodeSettings',
  components: { LayoutSection, StyleSection, Popup },
  props: {
    pnode: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      sections: {
        layout: { component: LayoutSection, model: { show: true } },
        style: { component: StyleSection, model: { show: true } }
      }
    }
  },
  watch: {
    sections: {
      deep: true,
      handler(newValue) {
        console.log('change sections', newValue);
      },
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  
}
</script>

<style scoped>
.node-settings-component {
  z-index: 3;
  position: fixed;
  top: 40px;
  right: 0;
  width: 300px;
  bottom: 0;
  background-color: orange;
  overflow: auto;
  background-color: #424242;
  border-top: 1px solid hsla(0,0%,100%,.12);
}

</style>
