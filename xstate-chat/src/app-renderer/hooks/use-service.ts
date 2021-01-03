import { isRef, shallowRef, watch } from "vue";

export default function useService (service) {
  const serviceRef = isRef(service) ? service : shallowRef(service);
  const state = shallowRef(serviceRef.value.state);
  const context = shallowRef(serviceRef.value.state.context);

  watch(
    serviceRef,
    (service, _, onCleanup) => {
      state.value = service.state;
      const { unsubscribe } = service.subscribe((currentState) => {
        if (currentState.changed) {
          state.value = currentState;
          context.value = currentState.context;
        }
      });
      onCleanup(() => unsubscribe());
    },
    {
      immediate: true
    }
  );

  const send = (event) => serviceRef.value.send(event);
  return { state, context, send, service: serviceRef };
}