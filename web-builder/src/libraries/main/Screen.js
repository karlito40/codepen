export default {
  name: 'Screen',
  render(h) {
    return h('div', { style: { position: 'relative' } }, [
      'Screen component',
      this.$slots.default
    ]);
  }
}