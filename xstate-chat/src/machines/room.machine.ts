import { remove } from '../utils/immutable';
import { createMachine } from 'xstate';
import { assign } from 'xstate';

export const roomMachine = createMachine({
  id: 'room',
  initial: 'listening',
  context: {
    players: [],
    messages: []
  },
  states: {
    listening: {
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
  },
  actions: {
    addMessage: assign({ 
      messages: (context, event) => [...context.messages, (event as any).data]
    }),
    addPlayer: assign({ 
      players: (context, event) => [...context.players, (event as any).data]
    }),
    removePlayer: assign({ 
      players: (context, event) => {
        const index = context.players.findIndex((player) => player.id === (event as any).data.id);
        return remove(context.players, index);
      },
      // reason: [self, kicked]
      messages: (context, event) => [...context.messages, (event as any).data.reason]
    })
  }
})
