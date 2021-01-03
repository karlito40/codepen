import { assign, createMachine, Machine, spawn } from 'xstate';
import { createRoomMachine } from './room-machine';

type TabsEvent = {
  type: 'OPEN_ROOM',
  roomId: string  
};

const context = {
  openedRooms: [],
  selectedRoom: null,
};

export const tabsMachine = createMachine<typeof context, TabsEvent>({
  id: 'chat',
  initial: 'idle',
  context: {
    openedRooms: [],
    selectedRoom: null,
  },
  states: {
    idle: {},
    selected: {}
  },
  on: { 
    OPEN_ROOM: {
      target: 'selected',
      actions: 'switchRoom'
    }
  }
}, {
  actions: {
    switchRoom: assign((context, event) => {
      console.log('switchRoom actions', event);
      let selectedRoom = context.openedRooms.find((room) => {
        return room.state.context.roomId === event.roomId
      });
      if (selectedRoom) {
        return { ...context, selectedRoom };
      }

      selectedRoom = spawn(createRoomMachine(event.roomId), `room-${event.roomId}`);
      
      return {
        openedRooms: [...context.openedRooms, selectedRoom],
        selectedRoom,
      };
    })
  }
});
