<template>
<pre>context: {{context}}</pre>
<pre>state: {{state}}</pre>
  <button class="UpdateHello" @click="update">
    update hello
  </button>
  <button @click="reset">
    Reset
  </button>
</template>

<script>
// import { fethHello } from '../apollo'
import { watch, watchEffect } from 'vue'
import { useHello } from '../hooks'

export default {
  setup () {
    let i = 0

    const { send, context, state } = useHello()
    const update = () => send('fetch', { msg : `click ${++i}` })
    const reset = () => send('reset')
    
    console.log('initial context', context)
    watch(context, (context, prevContext) => {
      console.log('context changed', context)
      // it was ovious :(
      console.log('context.test === prevContext.test', context.test === prevContext.test)
    })
    
    watchEffect(() => {
      console.log('hello changed', context.value)
    })
    
    return { state, update, reset, context }
  }
}
</script>