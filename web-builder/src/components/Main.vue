<template>
  <v-container class="main-screen" fluid>
    <div>{{currentPage}}</div>
    <Rule/>
    <Canvas/>
  </v-container>
</template>

<script>
import Canvas from './Canvas';
import Rule from './Rule';
import workspace from '../fixtures/workspace';

export default {
  name: 'MainScreen',
  components: { Canvas, Rule },
  data() {
    return { 
      currentPage: workspace.currentPage
    };
  },
  methods: {
    log: console.log
  }
}
</script>

<style scoped>
.main-screen {
  padding: 50px;
  padding-right: 30px;
  padding-bottom: 30px;
}
</style>

