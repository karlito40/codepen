import { createApp } from "vue/dist/vue.esm-bundler.js"; // to use template at runtime
import { interpret } from "xstate";
import { chatMachine } from "./machines/chat.machine";

const chatService = interpret(chatMachine)
  .onTransition((state) => console.log(state.value))
  .start();

const app = createApp({
  methods: {
    join () {
      chatService.send('JOIN');
    }
  },
  template: `<button @click="join">join</button>`
});


app.mount('#app');