import Vue from 'vue';
import { ref, onBeforeMount, onUnmounted } from '@vue/composition-api';
import { apolloProvider } from '@/plugins';
import { Auth } from '@/core';
import GET_ME from '@/graphql/GetMe.gql';

export default function useMe (token = Auth.getToken()) {
  const component = new Vue({ 
    apolloProvider,
    data: () => ({ me: undefined })
  });
  const { $apollo } = component;

  const me = ref(undefined);
  const query = ref(undefined);
  const loading = ref(undefined);

  onBeforeMount(() => {
    $apollo.addSmartQuery('me', {
      variables: { token },
      query: GET_ME,
      update: (data) => data.getMe
    });

    component.$watch('me', () => {
      me.value = component.me;
      loading.value = $apollo.queries.me.loading;
      query.value = $apollo.queries.me;
    }, { immediate: true })
  });

  onUnmounted(() => component.$destroy());
  return { me, loading, query };
}