import { Storage } from '@/core';
import { apollo } from '@/plugins/apollo-provider';
import LOGIN from '@/graphql/Login.gql';
import REGISTER_AUTH from '@/graphql/RegisterAuth.gql';
import router from '@/plugins/router';

const k = 'retard_token';

export default {
  async register (form) {
    try {
      const res = await apollo.mutate({
        mutation: REGISTER_AUTH,
        variables: { input: form }
      });
      
      this.setToken(res.data.registerAuth.token);
      router.push('/u/kasts');
    } catch (e) {
      console.error('something weird happened', e);
    }
  },

  async login (form) {
    try {
      const res = await apollo.mutate({
        mutation: LOGIN,
        variables: { input: form }
      });

      this.setToken(res.data.login.token);
      router.push('/u/kasts');
    } catch (e) {
      console.error('something weird thing happened', e);
    }
  },

  isAuthenticated: () => !!Storage.get(k),
  getToken: () => Storage.get(k),
  setToken: (v) => Storage.set(k, v),
};