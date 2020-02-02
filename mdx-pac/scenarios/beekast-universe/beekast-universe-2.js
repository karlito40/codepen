export default {
  data: () => ({ universe: {} }),
  apollo: {
    $subscribe: {
      // On peut imaginer recuperer automatiquement notre univers
      // dès la souscription
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