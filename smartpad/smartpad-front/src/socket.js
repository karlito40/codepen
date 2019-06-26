import io from 'socket.io-client';
import store from './store';

const { hostname } = window.location;
const socket = io(`http://${hostname}:81`, {
  transports: ['websocket']
});

socket.on('connect', () => {
  console.log('- socket connect');
  store.dispatch('set', { connected: true });
});

socket.on('change', (override) => {
  store.dispatch('set', override);
});

socket.on('disconnect', () => {
  console.log('- socket disconnect');
  store.dispatch('set', { connected: false });
});

socket.on('reconnect', () => {
  console.log('- socket reconnect');
  store.dispatch('set', { connected: true });
});

socket.on('pong', (ping) => {
  store.dispatch('set', { ping });
});

export default socket;