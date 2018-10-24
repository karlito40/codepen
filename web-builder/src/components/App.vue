<template>
  <v-app dark>
    <v-navigation-drawer 
      app 
      mini-variant
      mini-variant-width="60"
      clipped
      permanent
      class="tools-sidebar"
    >
      <SidebarTool/>
    </v-navigation-drawer>

    <v-navigation-drawer 
      app 
      clipped
      right
      permanent
      width="270"
      class="scheme-sidebar"
    >
      <SidebarScheme/>
    </v-navigation-drawer>

    <v-toolbar 
      app 
      height="40"
      clipped-left
      flat
      class="toolbar-options"
    ></v-toolbar>
    <v-content>
      <MainView/>
    </v-content>
  </v-app>
</template>

<script>
import SidebarTool from './SidebarTool';
import SidebarScheme from './SidebarScheme';
import MainView from './MainView';

export default {
  name: 'app',
  components: { 
    SidebarTool, 
    SidebarScheme, 
    MainView 
  },
}
</script>

<style>
*, *:after, *:before {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.tool-visualizer {
  display: none;
}

.node-component.in:hover > .tool-visualizer {
  display: block;
}
</style>

<style scoped>

.toolbar-options {
  background-color: #424242 !important;
  border-bottom: 1px solid hsla(0,0%,100%,.12);
}

</style>
