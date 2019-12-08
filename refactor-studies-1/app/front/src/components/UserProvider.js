import { Auth } from '@/core';
import GET_ME from '@/graphql/GetMe.gql'

export default {
  provide () {
    // So smart, isn't it ? ಠ‿ಠ 
    const $user = {};
    
    Object.defineProperty($user, 'me', {
      enumerable: true,
      get: () => this.me
    });
    Object.defineProperty($user, 'queries', {
      enumerable: true,
      get: () => this.$apollo.queries
    });

    return { $user };
  },

  apollo: {
    me: {
      query: GET_ME,
      variables () {
        return { token: Auth.getToken() }
      },
      update: (data) => data.getMe
    }
  },

  render () {
    return this.$slots.default;
  }
};
