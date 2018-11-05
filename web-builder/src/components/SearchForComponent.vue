<template>
  <div class="search-for-component">
    <v-btn light fab class="close" @click="close">
      <v-icon>close</v-icon>
    </v-btn>
    <div class="sfc-wrapper">
      <input ref="searchInput" class="search-input" type="search" name="search" placeholder="Search">
      <v-card>
        <v-list class="components-list" light>
          <template v-for="cat in items">
            <v-subheader :key="cat.id">
            {{ cat.name }}
            </v-subheader>
            <template v-for="component in cat.components">
              <v-divider :key="component.id + '-divider'"/>
              <v-list-tile :key="component.id + 'tile'" ripple @click="() => {}">
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
        </v-list>
      </v-card>
    </div>
  </div>
  
</template>

<script>
import Library from './Library';
import { libraries } from '@/libraries';

export default {
  props: {
    pnode: {
      type: Object,
      required: true
    },
  },
  data() {
    return { items: createItems() }
  },
  methods: {
    close() {
      this.$store.dispatch('disableSearchForComponent');
    }
  },
  mounted() {
    this.$refs.searchInput.focus();
  }
}

function createItems() {
  const items = [];
  for(let library of libraries) {
    let cat = {
      id: items.length,
      name: library.name || library.namespace,
      components: []
    };

    Object.values(library.store).forEach((c, index) => {
      cat.components.push({
        id: items.length + '-' + index,
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
.search-for-component {
  z-index: 10000;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(255, 255, 255, 0.85);
  color: white;
  overflow: auto;
  padding: 50px 0;
}

.sfc-wrapper {
  width: 80%;
  margin: 0 auto; 
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
}

.search-input {
  font-size: 6rem;
  background: none;
  color: black;
  display: block;
  width: 100%;
  border: 0;
  padding: 0;
  outline: 0;
}
</style>

