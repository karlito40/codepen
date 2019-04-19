export default {
  render() {
    return this.$scopedSlots.default(this.$store.state);
  }
}