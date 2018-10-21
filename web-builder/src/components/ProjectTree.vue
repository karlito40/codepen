<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="name"
    class="body-1 layer-tree"
    open-on-click
  >
    <template slot="prepend" slot-scope="{ item, open, leaf }">
      <v-icon small>layers</v-icon>
    </template>
  </v-treeview>
</template>

<script>
import { getCurrentPage } from '../fixtures/project';
import clone from 'clone';

export default {
  name: 'ProjectTree',
  data: () => ({
    // open: ['public'],
    open: [],
    tree: [],
    // items: getCurrentPage().tree[0].children
    items: clone(getCurrentPage().tree)
  })
}

</script>

<style scoped>
.body-1 >>> .v-treeview-node__label {
  font-size: inherit !important;
}
</style>