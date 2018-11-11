<template>
  <Popup class="node-settings-component" @close="close">
    <template slot="toolbar">Node Settings</template>
  </Popup>
</template>

<script>
import Popup from './Popup';

export default {
  name: 'NodeSettings',
  components: { Popup, },
  props: {
    pnode: {
      type: Object,
      required: true,
    },
  },
  methods: {
    close() {
      this.$store.dispatch('hideNodeSettings');
    }
  }
}
</script>

<style scoped>

</style>
