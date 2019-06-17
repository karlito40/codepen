<template>
  <v-container>
    <form class="mouse-form">
      <v-container fluid grid-list-lg>
        <div class="subheading">Mouse Control</div>
        
        <v-layout wrap>
          <v-flex>
            <v-text-field
              v-model="mouseX"
              label="X"
              type="number"
              outline
            ></v-text-field>
          </v-flex>
          <v-flex>
            <v-text-field
              v-model="mouseY"
              label="Y"
              type="number"
              outline
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    mouseX: 0,
    mouseY: 0
  }),

  watch: {
    mouseX () {
      console.log('mouseX change', this.mouseX);
    }
  }
}
</script>

