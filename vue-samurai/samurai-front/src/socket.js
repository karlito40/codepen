import io from 'socket.io-client';
import store from './store';

const socket = io('http://localhost:3006');

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

export const battle = {
  join() {
    store.dispatch('set', { searching: true });
    socket.emit('battle.join')
  },
  list: () => socket.emit('battle.list'),
  attack: () => socket.emit('battle.attack')
}

export default socket;