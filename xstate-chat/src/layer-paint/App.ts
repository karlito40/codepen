import { defineComponent } from "vue/dist/vue.esm-bundler";
import { chatMachine } from "../layer-machine";
import { useMachine } from "./hooks";

const setup = () => {
  const { state, send, service } = useMachine(chatMachine, { devTools: true })
  const join = () => send('ENTER_ROOM', { roomId: 'someRoomId' });

  return { join, state };
};

export const App = defineComponent({
  setup,
  template: `
    <button 
      v-if="state.matches('idle')" 
      @click="join"
    >
      join
    </button>
    <b v-else>{{state.value}}</b>
    <pre>state:{{state}}</pre>
  `
});