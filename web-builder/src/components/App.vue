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

    <SearchForComponent v-if="searchForComponent.active" :pnode="searchForComponent.nodeTarget"/>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import SidebarTool from './SidebarTool';
import SidebarScheme from './SidebarScheme';
import SearchForComponent from './SearchForComponent';
import MainView from './MainView';

export default {
  name: 'app',
  components: { 
    SidebarTool, 
    SidebarScheme, 
    MainView,
    SearchForComponent
  },
  computed: {
    ...mapState({
      messages: state => state.flash.messages
    }),
    ...mapState({
      searchForComponent: state => state.builder.searchForComponent
    })
  },
  methods: {
    ...mapActions(['removeFlash'])
  }
}
</script>

<style>
*, *:after, *:before {
  box-sizing: border-box;
}

.user-select-off {
  user-select: none;
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
</style>

<style scoped>

.toolbar-options {
  background-color: #424242 !important;
  border-bottom: 1px solid hsla(0,0%,100%,.12);
}

</style>
