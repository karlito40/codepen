<template>
  <v-navigation-drawer
    app
    clipped
    permanent
    :width="isExtended ? drawerWidths.extended + drawerWidths.mini : drawerWidths.mini"
    class="Sidebar"
  >
    <v-row class="fill-height flex-nowrap" no-gutters>
      <v-navigation-drawer
        dark
        mini-variant
        mini-variant-width="56"
        permanent
      >
        <div class="d-flex flex-column fill-height">
          <v-list
            dense
            nav
          >
            <v-list-item 
              v-for="(item, index) in menuFull"
              :key="index"
              :to="item.route"
            >
              <v-list-item-action>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.label }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <div class="mt-auto">
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-avatar>
                <UserAvatar :loading="$user.queries.me.loading" :user="$user.me" />
              </v-list-item-avatar>
            </v-list-item>
          </div>
        </div>
      </v-navigation-drawer>

      <div 
        v-if="isExtended" 
        class="ov-auto"
        :style="{ width: `${drawerWidths.extended}px` }"
      >
        <slot name="extended"/>
      </div>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
import UserAvatar from './UserAvatar';

export default {
  components: { UserAvatar },
  props: ['menu'],

  inject: ['$user'],

  computed: {
    drawerWidths: () => ({
      mini: 56,
      extended: 400
    }),

    isExtended () {
      return this.$slots.extended || this.$scopedSlots.extended;
    },

    menuFull() {
      return [
        { label: 'Mes sessions', icon: 'dashboard', route: '/u/kasts' }, 
        ...this.menu || []
      ];
    }
  }
}
</script>