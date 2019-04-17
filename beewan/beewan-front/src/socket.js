import io from 'socket.io-client';
import store from './store';

let socket = undefined;

export function init() {
  socket = io('http://localhost:3006');
  socket.on('connect', () => {
    store.dispatch('set', { connected: true });

    
    socket.on('change', (override) => {
      store.dispatch('set', override);
    });

    socket.on('disconnect', () => {
      store.dispatch('set', { connected: false });
    });
  });
}

export function getSocket() {
  return socket;
}