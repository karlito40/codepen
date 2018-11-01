<template>
  <div class="page-list">
    <v-list>
      <v-list-tile>
        <v-list-tile-content/>
        <v-list-tile-action>
          <v-tooltip left>
            <v-btn icon slot="activator" @click="handleNewPage">
              <v-icon>add_circle</v-icon>
            </v-btn>
            <span>New page</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

      <template v-for="page in pages">
        <v-list-tile :key="'tile-'+page.id" ripple @click="gotoPage(page.id)">
          <v-list-tile-content>{{page.name}}</v-list-tile-content>
          <v-list-tile-action>
            <v-icon>link</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="'divider-'+page.id"/>
      </template>
    </v-list>  
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'PageList',
  computed: {
    ...mapState({
      pages: state => state.workspace.pages
    }),
  },
  methods: {
    ...mapActions([
      'addPage',
      'gotoPage'
    ]),
    handleNewPage() {
      this.addPage('New page ' + Date.now());
    }
  }
  
  
}
</script>