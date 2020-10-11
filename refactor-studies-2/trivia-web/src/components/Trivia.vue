<template>
  <div class="Trivia">
    result: <pre>{{ context.hello }}</pre>
  </div>
</template>

<script>
import { useHello } from '../hooks'

export default {
  setup () {
    const { context, send } = useHello()
    send('fetch', { msg: 'home '})

    return { context }
  }
}
</script>