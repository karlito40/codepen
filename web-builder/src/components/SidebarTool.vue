<template>
  <v-layout column align-center class="pt-2">
    <span class="group" v-for="(tool, index) in tools" :key="index">
      <v-tooltip right>
        <v-btn icon slot="activator" @click="pick(tool)">
          <v-icon>{{tool.icon}}</v-icon>
        </v-btn>
        <span>{{tool.description}}</span>
      </v-tooltip>
    </span>
  </v-layout>
</template>

<script>
import clone from 'clone';
import withTools from '../fixtures/tools';

const tools = clone(withTools);

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
