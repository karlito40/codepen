<template>
  <div class="library">
    <v-list class="content">
      <template v-for="cat in items" v-if="cat.components.length">
        <v-subheader :key="cat.id">{{ cat.name }}</v-subheader>
        <template v-for="component in cat.components">
          <v-divider :key="component.id + '-divider'"/>
          <v-list-tile :key="component.id + 'tile'" @click="() => {}" ripple>
            <v-list-tile-action>
              <v-icon>layers</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{component.title}}</v-list-tile-title>
              <v-list-tile-sub-title>{{component.subtitle}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </template>
      <v-list-tile v-else>
        <v-list-tile-content>
          <v-list-tile-title>No components found</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
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
    if(library.reserved) {
      continue;
    }
    
    let cat = {
      id: items.length,
      name: library.name || library.namespace,
      namespace: library.namespace,
      components: []
    };

    Object.values(library.store).forEach((c, index) => {
      cat.components.push({
        id: items.length + '-' + index,
        name: c.name,
        title: `<${c.name}/>`,
        subtitle: `${c.name} component`
      });
    });
    items.push(cat);
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
  bottom: 0px;
  width: 100%;
}

.content {
  overflow: auto;
  top: 0;
  bottom: 55px;
  position: absolute;
  width: 100%;
}

>>> .v-input__slot:before {
  border: 0 !important;
}

</style>
