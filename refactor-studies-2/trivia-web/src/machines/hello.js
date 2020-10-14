import { createMachine, transition, state, invoke, reduce, immediate } from 'robot3'
// import { ref, watch } from 'vue'
import { ref } from 'vue'
import { client as apolloClient } from '../apollo'
import gql from 'graphql-tag'

const context = () => ({
  test: { blabla: 'stuff' },
  hello: null
});

export default createMachine({
  idle: state(
    transition('fetch', 'loading')
  ),
  loading: invoke(
    loadHello,
    transition(
      'done', 
      'success',
      reduce((ctx, ev) => ({...ctx, hello: ev.data }))
    )
  ),
  success: state(
    transition('fetch', 'loading'),
    transition('reset', 'reset')
  ),
  reset: state(
    immediate('idle', reduce((ctx) => ({ ...ctx, hello: null })))
  )
}, context);


function loadHello (context, { msg }) {
  // ref is a lifesaver here... and a weird pattern at the same time
  const hello = ref(null)
  const query = {
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
  apolloClient.query(query)
  // TODO: remove watcher
  apolloClient.watchQuery(query).subscribe((res) => {
    hello.value = res
  })

  return Promise.resolve(hello);
}

