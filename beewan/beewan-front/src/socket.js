import io from 'socket.io-client';
import store from './store';

let _socket = undefined;

export function init() {
  _socket = io('http://localhost:3006');
  _socket.on('connect', () => {
    console.log('- socket connect');
    store.dispatch('set', { connected: true });
  });

  _socket.on('change', (override) => {
    store.dispatch('set', override);
  });

  _socket.on('disconnect', () => {
    console.log('- socket disconnect');
    store.dispatch('set', { connected: false });
  });
  
  _socket.on('reconnect', () => {
    console.log('- socket reconnect');
    store.dispatch('set', { connected: true });
  });
}

export const battle = {
  join() {
    store.dispatch('set', { searching: true });
    _socket.emit('battle.join')
  },
  list: () => _socket.emit('battle.list'),
  attack: () => _socket.emit('battle.attack')
}

export function socket() {
  return _socket;
}