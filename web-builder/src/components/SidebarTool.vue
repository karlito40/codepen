<template>
  <v-layout column align-center class="pt-2">
    <span class="group pa-2" v-for="(tool, index) in tools" :key="index">
      <v-tooltip right>
        <v-icon slot="activator" @click="pick(tool)">{{tool.icon}}</v-icon>
        <span>{{tool.description}}</span>
      </v-tooltip>
    </span>
  </v-layout>
</template>

<script>
import tools from '../fixtures/tools';
export default {
  name: 'SidebarTool',
  data() {
    return { tools };
  },
  methods: {
    pick() {}
  }
}
</script>
