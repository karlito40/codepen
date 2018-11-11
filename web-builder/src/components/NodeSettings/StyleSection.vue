<template>
  <OptionSection class="style-section" v-model="section" title="Style">
    <template slot="content">
      Style section content [List Current Style]
      <v-btn round outline small @click="openPopup">New</v-btn>
      <Popup v-model="showPopup">
        <template slot="toolbar">New Style</template>
        <template slot="content">custom style here, postcss compilation</template>
      </Popup>
    </template>
    
  </OptionSection>
</template>

<script>
import clone from 'clone';
import OptionSection from './OptionSection';
import Popup from '../Popup';

export default {
  name: 'StyleSection',
  components: { OptionSection, Popup },
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return { 
      section: clone(this.value), 
      showPopup: false 
    }
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    }
  }
  
}
</script>

<style scoped>
</style>
