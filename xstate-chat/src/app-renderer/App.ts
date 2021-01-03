import { defineComponent } from "vue/dist/vue.esm-bundler";
import { tabsMachine/* , roomMachine */ } from "../app-skeleton";
import { useMachine } from "./hooks";
import { AwareRoom } from './context-room/AwareRoom';
import { RoomServiceProvider } from './components/MachineServiceProvider';
import { provide } from "vue";
import { MachineDI } from './constants';
import { AwareTabNav } from './context-tabs/AwareTabNav';

const setup = () => {
  const { state, send, context } = useMachine(tabsMachine, { devTools: true });
  const join = (roomId) => send('OPEN_ROOM', { roomId });
  
  join('#general');

  // Le service pourrait être passé en props (j'ai d'autres use case en tête ;))
  provide(MachineDI.Tabs, { state, send, context });

  return { join, state, context, MachineDI };
};

export const App = defineComponent({
  components: { AwareRoom, AwareTabNav, RoomServiceProvider },
  setup,
  template: `
    <button @click="join('#general')">join general</button>
    <button @click="join('#test')">join test</button>

    <AwareTabNav v-if="context.openedRooms.length"/>
    
    <RoomServiceProvider 
      v-if="state.matches('selected')"
      :key="context.selectedRoom"
      :service="context.selectedRoom"
    >
      <AwareRoom/>
    </RoomServiceProvider>
    <p v-else><b>{{state.value}}</b> state is not implemented yet !</p>
  `
});