<template>
  <section class="options-section">
    <v-layout align-center class="options-section-header body-2 py-2 pl-1 pr-2" v-ripple @click="toggleSection()">
      <v-icon :class="{'arrow-toggle-off': !value.show}">arrow_drop_down</v-icon>
      <div class="options-section-title">{{title}}</div>
    </v-layout>
    <div class="options-section-content pa-2" v-if="value.show">
      <slot name="content"/>
    </div>
  </section>
</template>

<script>
import clone from 'clone';

export default {
  name: 'OptionSection',
  props: {
    value: {
      type: Object,
      required: true
    }, 
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return { section: clone(this.value) }
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.section = clone(this.value);
      }
    }
  },
  methods: {
    toggleSection() {
      this.section.show = !this.section.show;
      this.$emit('input', clone(this.section));
    }
  }
}
</script>

<style scoped>
.options-section-header {
  background-color: #2b2a2a;
  border-top: 1px solid #696565;
  border-bottom: 1px solid #696565;
  cursor: pointer;
}

.arrow-toggle-off {
  transform: rotate(-90deg);
}
</style>
