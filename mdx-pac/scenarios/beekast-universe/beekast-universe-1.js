export default {
  apollo: {
    universe: {
      query: GET_BEEKAST_UNIVERSE,
      variable () {
        return { poleId: this.poleId };
      },
      update: (data) => data.universe,
      subscribeToMore: {
        document: ON_BEEKAST_UNIVERSE_CHANGE,
        variable () {
          return { poleId: this.poleId };
        },
        updateQuery (previousResult, { data: { changes } }) {
          return merge(previousResult, changes);
        }
      }
    },
  }
}