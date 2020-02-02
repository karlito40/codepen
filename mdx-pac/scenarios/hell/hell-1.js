export default {
  apollo: {
    availableChiottes: {
      query: GET_AVAILABLE_CHIOTTES,
      variables () {
        return { agenceId: this.agenceId };
      },
      skip () {
        return !this.agenceId;
      },
      update: (data) => data.agence.availableChiottes
    },
  },
}