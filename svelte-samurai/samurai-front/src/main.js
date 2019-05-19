import { CSSPlugin }  from "gsap/all"
import * as Socket from './socket';
import App from './App.svelte';

const treeShakingStore = [CSSPlugin];

Socket.init();

const app = new App({
	target: document.body
});

export default app;