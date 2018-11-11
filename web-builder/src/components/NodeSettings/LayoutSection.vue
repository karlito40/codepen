<template>
  <OptionSection class="layout-section" v-model="section" title="Layout">
    <template slot="content">
      Layout section content [PADDING & CO]
    </template>
  </OptionSection>
</template>

<script>
import clone from 'clone';
import OptionSection from './OptionSection';

export default {
  name: 'LayoutSection',
  components: { OptionSection },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return { section: clone(this.value) }
  },
  
}
</script>

<style scoped>
</style>
