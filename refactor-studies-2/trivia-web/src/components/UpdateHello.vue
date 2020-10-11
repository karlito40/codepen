<template>
  <button class="UpdateHello" @click="update">
    update hello
  </button>
</template>

<script>
// import { fethHello } from '../apollo'
import { useHello } from '../hooks'

export default {
  setup () {
    let i = 0
    const { send } = useHello()
    const update = () => send('fetch', { msg : `click ${++i}` })
    return { update }
  }
}
</script>