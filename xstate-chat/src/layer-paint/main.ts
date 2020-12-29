import { createApp } from "vue/dist/vue.esm-bundler.js"; // to use template at runtime
import { inspect } from "@xstate/inspect";
import { App } from "./App";

export function main () {
  inspect({ iframe: () => document.querySelector<HTMLIFrameElement>('iframe[data-xstate]') });

  const app = createApp(App);

  app.mount('#app');
  return app;
}
