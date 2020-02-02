export default {
  data: () => ({ universe: {} }),
  apollo: {
    $subscribe: {
      query: ON_BEEKAST_UNIVERSE,
      variable () {
        return { poleId: this.poleId };
      },
      result: ({ data: universeState }) => {
        return merge(this.universe, universeState);
      }
    }
  }
}