<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="id"
    class="body-1 page-tree"
    open-on-click
  >
    <template slot="prepend" slot-scope="{ item, open, leaf }">
      <v-icon small>layers</v-icon>
    </template>
  </v-treeview>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageTree',
  data() {
    const rootNode = this.$store.getters.currentTree[0];
    const rootId = (rootNode) ? rootNode.id : null;

    return {
      open: [rootId],
      tree: [],
    }
  },
  computed: {
    ...mapGetters({
      items: 'currentTree'
    })
  }
}

</script>

<style scoped>
.body-1 >>> .v-treeview-node__label {
  font-size: inherit !important;
}
</style>