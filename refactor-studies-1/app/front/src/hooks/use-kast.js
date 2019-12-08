import Vue from 'vue';
import { ref, onBeforeMount, onUnmounted } from '@vue/composition-api';
import { apolloProvider } from '@/plugins';
import GET_KAST from '@/graphql/GetKast.gql';

export default function useKast (kastId) {
  const component = new Vue({ 
    apolloProvider,
    data: () => ({ response: undefined })
  });
  const { $apollo } = component;

  const response = ref(undefined);
  const query = ref(undefined);
  const loading = ref(undefined);

  onBeforeMount(() => {
    $apollo.addSmartQuery('response', {
      variables: { kastId },
      query: GET_KAST,
      update: (data) => data.getKast
    });

    component.$watch('response', () => {
      response.value = component.response;
      loading.value = $apollo.queries.response.loading;
      query.value = $apollo.queries.response;
    }, { immediate: true })
  });

  onUnmounted(() => component.$destroy());

  return { kast: response, loading, query };
}