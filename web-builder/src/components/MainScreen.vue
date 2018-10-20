<template>
  <v-container class="main-screen" fluid>
    <Rule/>
    <Canvas/>
  </v-container>
</template>

<script>
import Canvas from './Canvas';
import Rule from './Rule';

export default {
  name: 'MainScreen',
  components: { Canvas, Rule }
}
</script>

<style scoped>
.main-screen {
  padding: 50px;
  padding-right: 30px;
  padding-bottom: 30px;
}
</style>

