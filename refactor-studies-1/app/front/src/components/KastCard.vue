<template>
  <v-card outlined tile>
    <v-img
      :src="kast.backgroundUrl"
      class="white--text align-end"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="150px"
    >
      <v-card-title v-text="kast.title"></v-card-title>
    </v-img>

    <v-card-actions :style="`border-top: 4px solid ${kast.color}`">
      <v-spacer></v-spacer>
      <v-btn text :loading="loading" @click="duplicate(kast)">Dupliquer</v-btn>
      <v-btn text @click="$router.push({ path: `/u/kast/${kast.id}` })">Ouvrir</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import DUPLICATE_KAST from '@/graphql/DuplicateKast.gql';

export default {
  props: {
    kast: { type: Object, required: true }
  },
  
  data: () => ({
    loading: false,
  }),

  methods: {
    duplicate (kast) {
      this.loading = true;
      this.$apollo.mutate({
        mutation: DUPLICATE_KAST,
        variables: { kastId: kast.id },
        refetchQueries: ['getKasts']
      })
        .catch(console.error)
        .then(() => this.loading = false);
    }
  }
}
</script>
