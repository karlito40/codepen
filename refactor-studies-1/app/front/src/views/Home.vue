<template>
  <v-app class="Home">
    <v-content>
      <v-container fill-height fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <router-view/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      alignments: [
        'start',
        'center',
        'end',
      ],
      tab: null,
      items: [
        { label: 'Connexion', to: 'signin' },
        { label: 'Inscription', to: 'signup'}
      ]
    }
  },
}
</script>