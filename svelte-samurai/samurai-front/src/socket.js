import io from 'socket.io-client';
import merge from 'lodash/merge';
import store from './store';

let _socket = undefined;

export function init() {
  _socket = io('http://localhost:3006');
  _socket.on('connect', () => {
    console.log('- socket connect');
    updateStore({ connected: true });
  });

  _socket.on('change', (override) => {
    updateStore(override);
  });

  _socket.on('disconnect', () => {
    console.log('- socket disconnect');
    updateStore({ connected: false });
  });
  
  _socket.on('reconnect', () => {
    console.log('- socket reconnect');
    updateStore({ connected: true });
  });
}

export const battle = {
  join() {
    updateStore({ searching: true });
    _socket.emit('battle.join')
  },
  list: () => _socket.emit('battle.list'),
  attack: () => _socket.emit('battle.attack')
}

export function socket() {
  return _socket;
}

function updateStore(v) {
  store.update(state => merge(state, v));
}