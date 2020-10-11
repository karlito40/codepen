<template>
  <Trivia/>
  <UpdateHello/>
</template>

<script>
/* import { provide } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import ApolloClient from 'apollo-boost' */
import Trivia from './components/Trivia'
import UpdateHello from './components/UpdateHello'

export default {
  components: { Trivia, UpdateHello },
  setup () {
    /*const apolloClient = new ApolloClient({
      connectToDevTools: true,
      uri: "http://localhost:4000"
    })
    // zzzzz apollo composable is bugged
    // at this time "Cannot read property '_apolloAppTracking' of undefined" (useQuery)
    provide(DefaultApolloClient, apolloClient)*/
  }
}
</script>
