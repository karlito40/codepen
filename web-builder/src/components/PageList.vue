<template>
  <div class="page-list">
    <v-list>
      <v-list-tile>
        <v-list-tile-content/>
        <v-list-tile-action>
          <v-tooltip left>
            <v-btn icon slot="activator">
              <v-icon>add_circle</v-icon>
            </v-btn>
            <span>New page</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
      <v-divider/>

      <template v-for="(page, index) in pages">
        <v-list-tile :key="'tile-'+index" ripple @click="() => {}">
          <v-list-tile-content>{{page.name}}</v-list-tile-content>
          <v-list-tile-action>
            <v-icon>link</v-icon>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider :key="'divider-'+index"/>
      </template>
    </v-list>  
  </div>
</template>

<script>
import project from '../fixtures/workspace';

export default {
  name: 'PageList',
  data() {
    return { pages: project.pages };
  }
}
</script>