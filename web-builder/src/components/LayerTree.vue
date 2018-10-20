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
  export default {
    name: 'LayerTree',
    data: () => ({
      open: ['public'],
      tree: [],
      items: [
        {
          name: '.git'
        },
        {
          name: 'node_modules'
        },
        {
          name: 'public',
          children: [
            {
              name: 'static',
              children: [{
                name: 'logo.png',
                file: 'png'
              }]
            },
            {
              name: 'favicon.ico',
              file: 'png'
            },
            {
              name: 'index.html',
              file: 'html'
            }
          ]
        },
        {
          name: '.gitignore',
          file: 'txt'
        },
        {
          name: 'babel.config.js',
          file: 'js'
        },
        {
          name: 'package.json',
          file: 'json'
        },
        {
          name: 'README.md',
          file: 'md'
        },
        {
          name: 'vue.config.js',
          file: 'js'
        },
        {
          name: 'yarn.lock',
          file: 'txt'
        }
      ]
    })
  }
</script>

<style scoped>
.body-1 >>> .v-treeview-node__label {
  font-size: inherit !important;
}
</style>