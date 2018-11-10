<template>
  <div class="search-in-library-component">
    <v-btn light fab class="close" @click="close">
      <v-icon>close</v-icon>
    </v-btn>
    <div class="sfc-wrapper">
      <input ref="searchInput" 
        class="search-input" 
        type="search" 
        name="search" 
        placeholder="Search"
        v-model="searchInput"
        autocomplete="off"
      >
      <v-card>
        <v-list class="components-list" light>
          <template v-for="cat in items" v-if="cat.components.length">
            <v-subheader :key="cat.id">
            {{ cat.name }}
            </v-subheader>
            <template v-for="component in cat.components">
              <v-divider :key="component.id + '-divider'"/>
              <v-list-tile :key="component.id + 'tile'" @click="pick(cat, component)" ripple>
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
      </v-card>
    </div>
  </div>
  
</template>

<script>
import uniqid from 'uniqid';
import clone from 'clone';
import Library from './Library';
import { libraries, getTag } from '@/libraries';

const baseItems = createItems();

export default {
  name: 'SearchInLibrary',
  props: {
    pnode: {
      type: Object,
      required: true,
    },
  },
  data() {
    return { 
      items: clone(baseItems),
      searchInput: ''
    }
  },
  watch: {
    searchInput() {
      this.items.forEach((item, index) => {
        this.items[index].components = baseItems[index].components.filter(
          c => c.name.toLowerCase().startsWith(this.searchInput.toLowerCase())
        )
      })
      
    }
  },
  methods: {
    close() {
      this.$store.dispatch('hideSearchInLibrary');
    },
    pick(cat, component) {
      this.$store.dispatch('addNode', {
        parentId: this.pnode.id,
        build:{
          component: {
            name: getTag(cat.namespace, component.name),
            options: {
              style: { 
                background: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid black'
              },
            }
          }
        },
      });
      this.close();

    }
  },
  mounted() {
    this.$refs.searchInput.focus();
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
.search-in-library-component {
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

