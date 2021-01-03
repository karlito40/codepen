import { defineComponent, provide } from "vue";
import { MachineDI } from "../constants";
import { useService } from "../hooks";

export const MachineServiceProvider = defineComponent({
  props: ['service', 'name'],
  
  setup ({ service, name }) {
    const { state, context, send } = useService(service);
    provide(name, { state, context, send });
  },

  template: '<slot/>'
})


export const RoomServiceProvider = defineComponent({
  props: ['service'],
  components: { MachineServiceProvider },
  setup: () => ({ MachineDI }),
  template: `
    <MachineServiceProvider
      :name="MachineDI.Room"
      :service="service"
    >
      <slot/>
    </MachineServiceProvider>
  `
});