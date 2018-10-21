<template>
  <div class="library">
    <v-list class="content">
      <template v-for="(item, index) in items">
        <v-subheader v-if="item.header" :key="item.header">
          {{ item.header }}
        </v-subheader>
        <v-divider v-else-if="item.divider" :key="index"></v-divider>
        <v-list-tile v-else 
          :key="item.id" 
          ripple 
          @click="() => {}"
        >
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
// import library from '../fixtures/library';
import { libraries } from '@/libraries';

export default {
  name: 'Library',
  data() {
    return { items: createItems() };
  }
}

function createItems() {
  const items = [];
  for(let library of libraries) {
    if(library.namespace === 'Reserved') {
      continue;
    }

    items.push({ header: library.namespace })  
    items.push({ divider: true });

    Object.values(library.store).forEach(c => {
      items.push({
        id: items.length,
        title: `<${c.name}/>`,
        subtitle: `${c.name} component`
      });
      
      items.push({ divider: true });
    });
  }

  return items;

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
