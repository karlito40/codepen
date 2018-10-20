<template>
  <div class="library">
    <v-card class="content" flat>
      <v-list>
        <template v-for="(item, index) in items">
          <v-subheader v-if="item.header" :key="item.header">
            {{ item.header }}
          </v-subheader>
          <v-divider v-else-if="item.divider" :key="index"></v-divider>


          <v-list-tile v-else :key="item.title">
            <v-list-tile-action>
              <v-icon>layers</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{item.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{item.subtitle}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>

      <!-- <v-card-text>
        <p>Hello</p>
        <p>Hello</p>
      </v-card-text> -->
    </v-card>
    <v-text-field
      class="search"
      placeholder="Search"
      append-icon="search"
      color="white"
      single-line
      hide-details
      clearable
      box/>
  </div>
</template>

<script>
import library from '../fixtures/library';

export default {
  name: 'Library',
  data() {
    return { items: library};
  }
}
</script>

<style scoped>

.library {
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
}

.search {
  position: absolute;
  bottom: -2px;
  width: 100%;
}

.content {
  overflow: scroll;
  top: 0;
  bottom: 55px;
  position: absolute;
  width: 100%;
}

</style>
