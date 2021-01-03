import { defineComponent, inject, ref } from "vue";
import { MachineDI } from "../constants";

export const AwareRoom = defineComponent({
  props: ['service'],

  setup () {
    const { context, send } = inject(MachineDI.Room);
    
    const form = ref({
      content: null
    });

    const submit = () => {
      if (!form.value.content) return console.log('fuck you');
      
      send({
        type: 'SEND_MESSAGE', 
        message: form.value
      });
    };

    return {
      context,
      submit,
      form
    };
  },

  template: `
    <div class="AwareRoom">
      <h1>{{ context.roomId }}</h1>
      <div class="message-list">
        <p
          :key="message.id" 
          v-for="message in context.messages"
          class="message"
        >
          {{ message.content }}
        </p>
      </div>  

      <form @submit.prevent="submit">
        <input 
          v-model="form.content"
          type="text" 
          placeholder="Envoyer un message"
        />
        <button>Chat</button>
      </form>
    </div>
  `
});