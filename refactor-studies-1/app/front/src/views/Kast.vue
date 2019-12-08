<template>
  <LayoutDashboard
    class="Kast"
    :menu="[
      { label: 'Présentation', icon: 'slideshow', route: `/u/kast/${$route.params.kastId}` },
      { label: 'Paramètres', icon: 'settings', route: `/u/kast/${$route.params.kastId}/settings` },
    ]"
  >
    <template #sidebar-extended>
      <Timeline class="pr-3"/>
    </template>

    <template #content>
      <v-progress-linear
        v-if="!$kast.current || $kast.queries.current.loading"
        indeterminate
        color="yellow darken-2"
      />
      <template v-else>
        <v-navigation-drawer
          v-model="drawerRight"
          fixed
          right
          temporary
        >
          Slide Form
        </v-navigation-drawer>
  
        <div class="slideshow d-flex flex-column fill-height">
          <div class="pa-10 flex-grow-1">
            <v-badge
              color="red"
              right
              overlap
              class="badge-participant"
            >
              <template #badge>
                <span class="caption">{{ $kast.current.nbParticipant }}</span>
              </template>
              <v-icon
                color="grey lighten-1"
                large
              >
                account_circle
              </v-icon>
            </v-badge>
            
            <v-carousel
              v-model="currentSlideIndex"
              hide-delimiter-background
              show-arrows-on-hover
              hide-delimiters
              next-icon="arrow_right"
              prev-icon="arrow_left"
              class="elevation-24"
              height="100%"
            >
              <v-carousel-item
                v-for="(slide, i) in $kast.current.slides"
                :key="i"
              >
                <v-sheet
                  :color="slide.color"
                  height="100%"
                >
                  <v-row
                    class="fill-height"
                    align="center"
                    justify="center"
                  >
                    <div class="display-3">{{ slide.title }}</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>
          <v-divider/>
          <div class="slideshow__footer">
              <v-row class="py-4 px-6" no-gutters>
                <v-col cols="11">
                  <v-sheet color="transparent">
                    <v-slide-group
                      v-model="currentSlideIndex"
                      center-active
                      show-arrows
                      next-icon="arrow_right"
                      prev-icon="arrow_left"
                    >
                      <v-slide-item
                        v-for="(slide, i) in $kast.current.slides"
                        :key="i"
                        #default="{ active, toggle }"
                      >
                        <v-card
                          class="mx-2"
                          height="60"
                          width="100"
                          outlined
                          @click="toggle"
                        >
                          <v-progress-linear
                            v-if="slide.duplicating"
                            indeterminate
                            color="yellow darken-2"
                          />
                          <template v-else>{{ slide.title }}</template>
                        </v-card>
                      </v-slide-item>
                    </v-slide-group>
                  </v-sheet>
                </v-col>
                <v-col align-self="center" cols="1" class="text-center">
                  <v-tooltip top>
                    <template #activator="{ on }">
                      <v-btn
                        fab
                        small 
                        dark
                        color="grey darken-4"
                        @click="drawerRight = true"
                        v-on="on"
                      >
                        <v-icon>add</v-icon>
                      </v-btn>
                    </template>
                    <span>Ajouter un slide</span>
                  </v-tooltip>
                </v-col>
              </v-row>
          </div>
        </div>
      </template>
    </template>
  </LayoutDashboard>
</template>

<script>
import Timeline from '../components/Timeline';
import LayoutDashboard from './LayoutDashboard';

export default {
  components: { Timeline, LayoutDashboard },
  
  inject: ['$kast'],

  data: () => ({
    drawerRight: false,
    currentSlideIndex: 0
  })
}
</script>

<style lang="scss" scoped>
.v-carousel {
  border-radius: 5px;
}

.v-slide-item--active {
  border: 2px solid rgb(228, 167, 55) !important
}

.badge-participant {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  border-radius: 50%;
}
</style>