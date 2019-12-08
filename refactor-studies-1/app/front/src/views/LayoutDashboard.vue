<template>
  <v-app class="LayoutDashboard">
    <Sidebar :menu="menu">
      <template 
        v-if="$slots['sidebar-extended'] || $scopedSlots['sidebar-extended']" 
        #extended
      >
        <slot name="sidebar-extended"/>
      </template>
    </Sidebar>

    <v-content>
      <slot name="content"/>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Sidebar from '../components/Sidebar'

export default {
  components: { Sidebar },
  props: ['menu'],
}
</script>
