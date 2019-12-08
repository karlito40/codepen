<template>
  <v-card class="elevation-12">
    <v-toolbar
      flat
      dark
      class="grey darken-4 white--text"
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            to="/login"
            v-on="on"
          >
            <v-icon>dashboard</v-icon>
          </v-btn>
        </template>
        <span>Login</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            large
            to="/signup"
            v-on="on"
          >
            <v-icon>person_add</v-icon>
          </v-btn>
        </template>
        <span>Inscription</span>
      </v-tooltip>
    </v-toolbar>
    <v-card-text>
      <slot name="content"/>
    </v-card-text>
    <v-card-actions>
      <slot name="actions"/>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['title']
}
</script>