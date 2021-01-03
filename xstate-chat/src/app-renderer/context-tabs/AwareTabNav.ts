import { computed, defineComponent, inject } from "vue";
import { MachineDI } from "../constants";
import { useService } from "../hooks";

export const AwareTabNav = defineComponent({
  setup () {
    const { context } = inject(MachineDI.Tabs);

    const tabs = computed(() => {
      const { openedRooms: roomServices } = context.value;

      return roomServices.map((service) => {
        const { context } = useService(service);
        const { messages, roomId } = context.value;
        
        return {
          messageCount: messages.length,
          label: roomId,
          key: roomId
        };
      });
    });
    
    return { context, tabs };
  },
  template: `
    <nav class="AwareTabNav">
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab.key"
        >
          {{ tab.label }} ({{ tab.messageCount }})
        </li>
      </ul>
    </nav>
  `
});