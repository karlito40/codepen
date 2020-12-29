import { createMachine } from 'xstate';

export type JoinRoomEvent = {
  type: 'JOIN',
  roomId: string
};

export const machineTemplate = createMachine({
  id: 'chat',
  initial: 'idle',
  states: {
    idle: { 
      on: { 
        ENTER_ROOM: {
          target: 'room',
          // actions: 'joinRoom'
        } 
      }
    },
    room: {
      invoke: {
        id: 'roomMachine',
        src: 'startRoomMachine',
        data: {
          roomId: (context, event) => event.roomId,
          players: [],
          messages: []
        },
        onDone: 'idle'
      }
    }
  }
});
