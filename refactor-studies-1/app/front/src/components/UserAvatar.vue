<template>
  <v-row class="UserAvatar" align="center" justify="center">
    <v-progress-circular
      v-if="loading"
      :color="loadingColor"
      :size="size * 0.8"
      indeterminate
    />
    <v-avatar v-else :size="size">
      <v-img :src="`https://api.adorable.io/avatars/80/${user.id}`"></v-img>
    </v-avatar>
  </v-row>
</template>

<script>
export default {
  props: {
    user: Object,
    loading: Boolean,
    loadingColor: { type: String, default: 'grey lighten-1' },
    size: { type: [Number, String], default: 48 }
  }
}
</script>