<template>
  <LayoutDashboard class="KastList" #content>
    <v-progress-linear
      v-if="$apollo.loading || !kasts"
      indeterminate
      color="yellow darken-2"
    />
    <div v-else-if="!kasts.length">No kasts found. Please add one.</div>
    <v-container v-else fluid>
      <v-row>
        <v-col
          v-for="kast in kasts"
          :key="kast.id"
          cols="3"
        >
          <KastCard :kast="kast"/>
        </v-col>
      </v-row>
    </v-container>
    
    <v-dialog 
      v-model="showForm" 
      max-width="600px"
    >
      <template #activator="{ on: onForm }">
        <v-tooltip left>
          <template #activator="{ on: onTooltip }">
            {{ /* {...onForm, ...onTooltip} ne devrait pas marcher...
            peut etre que vue a fix se bug ?! */ }}
            <v-btn 
              fab
              fixed
              bottom
              right
              dark
              rounded
              color="grey darken-4"
              v-on="{ ...onTooltip, ...onForm }"
            >
              <v-icon dark>add</v-icon>
            </v-btn>
          </template>
          <span>Créer une session</span>
        </v-tooltip>
      </template>
      <router-view/>
    </v-dialog>
  </LayoutDashboard>
</template>

<script>
import GET_KASTS from '@/graphql/GetKasts.gql';
import KastCard from '../components/KastCard';
import LayoutDashboard from './LayoutDashboard';

export default {
  components: { LayoutDashboard, KastCard },
  
  inject: ['$user'],

  data: () => ({
    showForm: false,
    items: [
      { title: 'Home', icon: 'dashboard' },
      { title: 'About', icon: 'question_answer' },
    ]
  }),

  apollo: {
    kasts: {
      query: GET_KASTS,
      variables () {
        return { userId: this.$user.me.id }
      },
      skip () {
        return !this.$user.me
      },
      update: data => data.getKasts
    }
  },

  watch: {
    showForm: {
      immediate: true,
      handler () {
        if (!this.showForm && this.$route.path !== '/u/kasts') {
          this.$router.push('/u/kasts');
        } else if(this.showForm && this.$route.path !== '/u/kasts/new') {
          this.$router.push('/u/kasts/new');
        }
      }
    },

    '$route': {
      immediate: true,
      handler (to) {
        if (to.path === '/u/kasts') {
          this.showForm = false;
        }
      }
    }
  }
}
</script>