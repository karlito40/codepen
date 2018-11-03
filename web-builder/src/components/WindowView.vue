<template>
  <iframe class="window-view" scrolling="no" @load="onLoad" ref="iframe"></iframe>
</template>

<script>
import Vue from 'vue';
import store from '../store';

export default {
  name: 'frame',
  render(h) {
    return h('iframe',{
      on: { load: this.onLoad }
    })
  },
  beforeUpdate() {
    this.app.children = Object.freeze(this.$slots.default);
    this.app.$nextTick(() => {
      this.$refs.iframe.style.height = this.$refs.iframe.contentWindow.document.body.scrollHeight + 'px';
    });
  },  
  methods: {
    onLoad() {
      const children = this.$slots.default;
      const body = this.$el.contentDocument.body;
      const head = this.$el.contentDocument.head;
      const el = document.createElement('div');

      body.appendChild(el);

      // [...document.querySelectorAll('style:not(#vuetify-theme-stylesheet)')].forEach(styleNode => {
      // We keep vuetify style to be able to use it as a library
      [...document.querySelectorAll('style, link')].forEach(styleNode => {
        const copy = this.$refs.iframe.contentWindow.document.importNode(styleNode, true);
        head.appendChild(copy);
      })

      this.app = new Vue({
        name: 'frameApp',
        store,
        data: { children: Object.freeze(children) }, 
        render(h) {
          return h('div', this.children);
        },
      }).$mount(el);

      this.$refs.iframe.style.height = this.$refs.iframe.contentWindow.document.body.scrollHeight + 'px';
      this.$emit('ready', this.$refs.iframe);
    }
  }
}
</script>

<style scoped>
iframe {
  border: 0;
}

</style>
