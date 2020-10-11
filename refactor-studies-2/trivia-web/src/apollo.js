import ApolloClient from 'apollo-boost'
/* import gql from 'graphql-tag'
import { onUnmounted, ref } from 'vue' */

export const client = new ApolloClient({
  connectToDevTools: true,
  uri: "http://localhost:4000"
})



/*export function useHello (msg) {
  console.log('useHello')
  const result = ref(null)

  fethHello(msg)
  const observer = apolloClient.watchQuery(buildHelloQuery(msg))
  observer.subscribe((res) => {
    result.value = res
  })

  onUnmounted(() => observer.unsubscribe()) 

  return { result }
}

export function fethHello (msg) {
  return apolloClient.query(buildHelloQuery(msg))
}

function buildHelloQuery (msg) {
  return {
    variables: { msg },
    query: gql`
      query getHello($msg: String!) {
        hello (msg: $msg) { 
          id
          msg
        }
      }
    `
  }
}*/