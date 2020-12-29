import { assign } from 'xstate';
import { machineTemplate, JoinRoomEvent } from './chat-machine.tpl';
import { roomMachine } from './room-machine.impl';

export const chatMachine = machineTemplate.withConfig({
  services: {
    startRoomMachine: (context, event) => roomMachine
  },
  actions: {
    // vscode show error but ts still compile
    // ... weird conf i guess (anyway it should'nt be type like that
    // but i don't care atm)
    /* joinRoom: assign({
      roomId: (context, event: JoinRoomEvent) => {
        console.log('joinroom roomId', event.roomId);
        return event.roomId;
      }
    }) */
  } 
});