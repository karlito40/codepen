import { remove } from '../utils/immutable';
import { assign } from 'xstate';
import { AddMessageEvent, machineTemplate, PlayerJoinedEvent, PlayerLeavedEvent } from './room-machine.tpl';
import { isMe } from '../layer-data/player';

export const roomMachine = machineTemplate.withConfig({
  guards: {
    imTheTargetedPlayer: (context, event: PlayerLeavedEvent) => {
      console.log('imTheTargetedPlayer', event);
      return isMe(event.player)
    },
  },

  actions: {
    addMessage: assign({ 
      messages: (context, event: AddMessageEvent) => {
        console.log('addMessage', context.messages, event.message, event);
        return [...context.messages, event.message]
      }
    }),

    addPlayer: assign({ 
      players: (context, event: PlayerJoinedEvent) => {
        console.log('addPlayer', context.players, event.player, event);
        return [...context.players, event.player]
      }
    }),

    removePlayer: assign({ 
      players: (context, event: PlayerLeavedEvent) => {
        console.log('removePlayer', event);
        const index = context.players.findIndex((player) => player.id === event.player.id);
        return remove(context.players, index);
      },
      // reason: [self, kicked]
      messages: (context, event) => [...context.messages, event.reason]
    })
  }
})
