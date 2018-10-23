<template>
  <v-container class="main-screen" fluid>
    <div>{{currentPage}}</div>
    <Rule v-if="isWorkspaceLoad"/>
    <WindowView @ready="onWorkspaceReady">
      <Canvas/>
    </WindowView>
  </v-container>
</template>

<script>
import Canvas from './Canvas';
import Rule from './Rule';
import WindowView from './WindowView';
import workspace from '../fixtures/workspace';

export default {
  name: 'MainView',
  components: { Canvas, Rule, WindowView },
  data() {
    return {
      isWorkspaceLoad: false,
      currentPage: workspace.currentPage
    };
  },
  methods: {
    log: console.log,
    onWorkspaceReady() {
      this.isWorkspaceLoad = true;
    },
  }
}
</script>

<style scoped>
.main-screen {
  padding: 50px;
  padding-right: 30px;
  padding-bottom: 30px;
}

>>> .window-view {
  width: 100%;
}
</style>

