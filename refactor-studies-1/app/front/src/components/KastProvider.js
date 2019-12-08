import GET_KAST from '@/graphql/GetKast.gql';
import SLIDE_UPDATED from '@/graphql/SlideUpdated.gql';
import KAST_UPDATED from '@/graphql/KastUpdated.gql';

export default {
  provide () {
    // So smart, isn't it ? ಠ‿ಠ 
    const $kast = {};
    
    Object.defineProperty($kast, 'current', {
      enumerable: true,
      get: () => this.current
    });
    Object.defineProperty($kast, 'queries', {
      enumerable: true,
      get: () => this.$apollo.queries
    });

    return { $kast };
  },

  apollo: {
    current: {
      query: GET_KAST,
      variables () {
        return { kastId: this.$route.params.kastId }
      },
      update: (data) => data.getKast,
      subscribeToMore: [{
        document: SLIDE_UPDATED,
        variables () {
					return { kastId: this.$route.params.kastId };
				}
      }, {
        document: KAST_UPDATED,
        variables () {
					return { kastId: this.$route.params.kastId };
        },
        updateQuery (prevRes, { subscriptionData: { data } }) {
          return {
            getKast: {
              ...prevRes.getKast,
              ...data.kastUpdated._changes_.reduce((acc, change) => {
                acc[change] = data.kastUpdated[change];
                return acc;
              }, {})
            }
          }
        }
      }]
    }
  },

  render () {
    return this.$slots.default;
  }
};
