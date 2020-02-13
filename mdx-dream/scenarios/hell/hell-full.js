export default {
  data: () => ({ 
    doNotUseChiotte: false,
    ongoingWar: false,
  }),

  apollo: {
    me: getMe,
    employees () {
      return getEmployees({ agenceId: this.agenceId });
    },
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
        {
          document: ON_PARTICIPANT_LEFT,
          variables () {
            return { agenceId: this.agenceId };
          },
          updateQuery (previousResult, { subscriptionData }) {
            const chioteIndex = previousResult.agence.availableChiottes.findIndex((chiote) => chiote.id === subscriptionData.data.participantLeft.id);

            return merge({
              agence: {
                availableChiottes: remove(previousResult.agence.availableChiottes, chioteIndex)
              }
            });
          } 
        }
      ]
    },

    $subscribe: [
      {
        query: ON_LUDO_3PM,
        variables () {
          return { ludoId: this.ludoId };
        },
        skip () {
          return this.me.id === this.ludoId;
        },
        result () {
          this.doNotUseChiotte = true
        } 
      },
      {
        query: ON_NERF_WAR_START,
        variables () {
          return { agenceId: this.agenceId };
        },
        skip () {
          return !this.agenceId;
        },
        result () {
          this.ongoingWar = true
        }
      },
      {
        query: ON_ACCIDENTS_DE_TRAVAIL,
        variables () {
          return { agenceId: this.agenceId };
        },
        skip () {
          return !this.agenceId;
        },
        result ({ data: collateralDamage }) {
          const query = apollo.readQuery({
            query: ACCIDENTS_DE_TRAVAIL,
            variables: { agenceId: this.agenceId }
          });

          apollo.writeQuery({
            query: ACCIDENTS_DE_TRAVAIL,
            variables: { agenceId: this.agenceId },
            data: {
              ...query,
              agence: {
                accidents: [...query.agence.accidents, collateralDamage]
              } 
            }
          });
        }
      },
    ],
  },

  computed: {
    chiotteToUse () {
      if (this.doNotUseChiotte) return;

      return this.availableChiottes?.[0];
    },

    myChiotte () {
      return hasPermission('to.chier') && !this.ongoingWar && this.chiotteToUse;
    }
  },

  watch: {
    ongoingWar () {
      this.clearInterval(this.interval);
      
      if (!this.ongoingWar) return;

      this.interval = setInterval(async () => {
        this.$apollo.mutate({
          query: FIRE_ROCKET,
          variables: { to: random(this.employees) },
          refetchQueries: ['getBoards', 'getMeetings'],
          update (store, { data: { collateralDamage }}) {
            const query = store.readQuery({
              query: ACCIDENTS_DE_TRAVAIL,
              variables: { agenceId: this.agenceId }
            });
    
            store.writeQuery({
              query: ACCIDENTS_DE_TRAVAIL,
              variables: { agenceId: this.agenceId },
              data: {
                ...query,
               agence: {
                 accidents: [...query.agence.accidents, collateralDamage]
               } 
              }
            });
          }
        });
      });
    }
  },
}