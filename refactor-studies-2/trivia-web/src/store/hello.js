import { onUnmounted, ref } from 'vue'
import { client as apolloClient } from '../apollo'
import gql from 'graphql-tag'

export default function useQuery (query) {
  const result = ref(null)
  apolloClient.query(query)
  const observer = apolloClient.watchQuery(query).subscribe((r) => {
    result.value = r
  })
  
  onUnmounted(() => observer.unsubscribe())

  return { observer }
}

export function useHello (msg) {
  return useQuery({
    variables: { msg },
    query: gql`
      query getHello($msg: String!) {
        hello (msg: $msg) { 
          id
          msg
        }
      }
    `
  })
}
