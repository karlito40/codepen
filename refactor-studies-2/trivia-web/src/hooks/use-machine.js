import { interpret } from 'robot3'
import { ref } from 'vue'

export default function useMachine (machine) {
  const context = ref(null)
  const state = ref(null)
  const service = interpret(machine, () => { 
    state.value = service.machine.current
    context.value = service.context
  })
  context.value = service.context

  return {
    context,
    state,
    send: (type, params = {}) => service.send({ type, ...params })
  }
}
