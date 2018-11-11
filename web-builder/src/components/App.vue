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
      width="300"
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

    <v-snackbar :key="message.id" v-for="message in messages"
      right
      top
      :value="true"
    >
      {{ message.text }}
      <v-btn flat @click="removeFlash(message)">Close</v-btn>
    </v-snackbar>

    <v-content>
      <MainView/>
    </v-content>

    <SearchInLibrary v-if="searchInLibrary.active" :pnode="searchInLibrary.nodeTarget"/>
    <transition name="slide-node-settings">
      <NodeSettings v-if="nodeSettings.active" :pnode="nodeSettings.nodeTarget" @close="hideNodeSettings"/>
    </transition>
    
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NodeSettings from './NodeSettings/NodeSettings';
import SidebarTool from './SidebarTool';
import SidebarScheme from './SidebarScheme';
import SearchInLibrary from './SearchInLibrary';
import MainView from './MainView';

export default {
  name: 'app',
  components: { 
    SidebarTool, 
    SidebarScheme, 
    MainView,
    SearchInLibrary,
    NodeSettings
  },
  computed: {
    ...mapState({
      messages: state => state.flash.messages,
      searchInLibrary: state => state.builder.searchInLibrary,
      nodeSettings: state => state.builder.nodeSettings,
    }),
  },
  methods: {
    ...mapActions([
      'removeFlash', 
      'hideNodeSettings'
    ])
  }
}
</script>

<style>
*, *:after, *:before {
  box-sizing: border-box;
  user-select: none;
}

.user-select-off {
  user-select: none;
}

.pointer-events-off {
  pointer-events: none;
}

body {
  margin: 0;
  padding: 0;
}

.tool-visualizer {
  display: none;
}

.pnode.in:hover > .tool-visualizer {
  display: block;
}

.slide-node-settings-enter-active, .slide-node-settings-leave-active {
  transition: transform .27s;
}
.slide-node-settings-enter, .slide-node-settings-leave-to {
  transform: translateX(300px);
}

</style>

<style scoped>
.toolbar-options {
  background-color: #424242 !important;
  border-bottom: 1px solid hsla(0,0%,100%,.12);
}

</style>
