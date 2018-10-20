<template>
  <v-tabs class="tabs" grow slider-color="white">
    <v-tab v-for="(tab, index) in schemeTabs" :key="index" :ripple="false">
      {{tab.title}}
    </v-tab>
    <v-tab-item v-for="(tab, index) in schemeTabs" :key="index">
      <component :is="tab.component"/>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import LayerTree from './LayerTree';
import Library from './Library';

const Pages = {
  name: 'Pages'
}
export default {
  name: 'SidebarScheme',
  data() {
    return { 
      schemeTabs: [
        {title: 'Layers', component: LayerTree },
        {title: 'Pages', component: Pages },
        {title: 'Library', component: Library },
      ]
    };
  },
}
</script>

<style scoped>
.tabs >>> .v-window-item {
  height: calc(100vh - 90px);
  position: relative;
  overflow: auto;
}
</style>

