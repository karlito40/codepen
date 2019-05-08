import * as Socket from './socket';
import App from './App.svelte';

Socket.init();

const app = new App({
	target: document.body
});

export default app;