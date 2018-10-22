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
import PageTree from './PageTree';
import Library from './Library';
import PageList from './PageList';

export default {
  name: 'SidebarScheme',
  data() {
    return { 
      schemeTabs: [
        {title: 'Project', component: PageTree },
        {title: 'Pages', component: PageList },
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

