import { ref } from "vue";
import { onBeforeUnmount, onMounted, shallowRef } from "vue/dist/vue.esm-bundler";
import { interpret, State } from "xstate";

export default function useMachine (machine, options) {
  const {
    context,
    guards,
    actions,
    activities,
    services,
    delays,
    state: rehydratedState,
    ...interpreterOptions
  } = options;

  const machineConfig = {
    context,
    guards,
    actions,
    activities,
    services,
    delays
  };

  const createdMachine = machine.withConfig(machineConfig, {
    ...machine.context,
    ...context
  });

  const service = interpret(createdMachine, interpreterOptions).start(
    rehydratedState ? State.create(rehydratedState) : undefined
  );

  const stateRef = shallowRef(service.state);
  const contextRef = shallowRef(service.state.context);
  
  onMounted(() => {
    service.onTransition((currentState) => {
      if (currentState.changed) {
        stateRef.value = currentState;
        contextRef.value = currentState.context;
      }
    });

    stateRef.value = service.state;
    contextRef.value = service.state.context;
  });

  onBeforeUnmount(() => {
    service.stop();
  });

  return { state: stateRef, context: contextRef, send: service.send, service };
}