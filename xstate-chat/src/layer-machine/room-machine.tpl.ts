import { createMachine } from 'xstate';
import { Player } from '../layer-data/player';
import { watchRoom } from '../layer-data/room';

export type AddMessageEvent = {
  type: 'NEW_MESSAGE';
  message: string;
};

export type PlayerJoinedEvent = {
  type: 'NEW_MESSAGE';
  player: Player;
};

export type PlayerLeavedEvent = {
  type: 'NEW_MESSAGE';
  reason: 'kicked' | 'self';
  player: Player;
};

export const machineTemplate = createMachine({
  id: 'room',
  initial: 'listening',
  context: {
    roomId: undefined,
    players: [],
    messages: []
  },
  states: {
    listening: {
      invoke: {
        id: 'roomServer',
        src: (context, event) => watchRoom(context.roomId),
      },
      on: {
        NEW_MESSAGE: {
          actions: 'addMessage'
        },
        PLAYER_JOINED: {
          actions: 'addPlayer'
        },
        PLAYER_LEAVED: [
          { 
            target: 'leaved',
            cond: 'imTheTargetedPlayer'
          },
          {
            actions: 'removePlayer'
          }
        ]
      }
    },
    leaved: {
      type: 'final'
    }
  }
}, {
  guards: {
    imTheTargetedPlayer: (context, event) => true,
  }
});
