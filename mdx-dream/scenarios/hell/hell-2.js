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
      update: (data) => data.agence.availableChiottes,
      subscribeToMore: [
        {
          document: ON_PARTICIPANT_JOIN,
          variables () {
            return { agenceId: this.agenceId };
          },
          updateQuery (previousResult, { subscriptionData }) {
            return {
              ...previousResult,
              agence: {
                ...previousResult.agence,
                availableChiottes: [
                  ...previousResult.agence.availableChiottes,
                  subscriptionData.data.participantJoin.chiote
                ]
              }
            }
          } 
        },
      ]
    },
  },
}