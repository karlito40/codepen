import { createMachine } from 'xstate';
import { roomMachine } from './room.machine';

export const chatMachine = createMachine({
  id: 'chat',
  initial: 'idle',
  context: {
    roomId: undefined,
  },
  states: {
    idle: { 
      on: { 
        JOIN: 'joining' 
      }
    },
    joining: {
      invoke: {
        src: 'startRoomMachine',
        onDone: 'authorized',
        onError: 'rejected'
      }
    },
    authorized: {
      type: 'final'
    },
    rejected: {
      on: { 
        JOIN: 'joining' 
      }
    }
  }
}, {
  services: {
    startRoomMachine: (context, event) => roomMachine
  }
});
