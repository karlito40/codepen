<template>
  <div class="node-settings-component" v-draggable="{by: '.toolbar'}">
    <div class="toolbar">Node Settings</div>
    <div class="content">
      <v-btn round outline small @click="close">OK</v-btn>
      <v-btn round outline small color="grey" @click="close">Annuler</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NodeSettings',
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
.node-settings-component {
  background-color: #424242;
  /* border: 1px solid hsla(0,0%,100%,.12); */
  border-radius: 10px;
  z-index: 10000;
  position: fixed;
  top: 75px;
  right: 285px;
  width: 700px;
  max-width: calc(100% - 285px);
  color: white;
  padding-bottom: 50px;
  box-shadow: rgba(2, 2, 2, 0.2) 0px 0px 40px 3px;
}

.toolbar {
  background: linear-gradient(#f0f0f0, #c4c4c4);
  border-radius: 8px 8px 0 0;
  color: black;
  text-align: center;
}
</style>
