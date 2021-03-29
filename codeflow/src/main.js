import { createApp } from 'vue'
import { gsap, Draggable } from "gsap/all";
import App from './App.vue'

gsap.registerPlugin(Draggable); 

createApp(App).mount('#app')

