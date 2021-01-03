import { assign, createMachine } from 'xstate';
import { isMe } from '../app-data/player';
import { watchRoom } from '../app-data/room';
import { Message, Player } from '../app-data/types';
import { fakeId } from '../fixtures/fakes';
import { remove } from '../utils/immutable';

type RoomContext = {
  roomId: string;
  players: Player[];
  messages: Message[]
};

type NewMessageEvent =  { type: 'NEW_MESSAGE'; message: string; };
type PlayerJoinedEvent = { type: 'PLAYER_JOINED'; player: Player; };
type PlayerLeavedEvent = { 
  type: 'PLAYER_LEAVED'; 
  reason: 'kicked' | 'self'; 
  player: Player; 
};

type RoomEvent = NewMessageEvent | PlayerJoinedEvent | PlayerLeavedEvent;

export const createRoomMachine = (roomId) => createMachine<RoomContext, RoomEvent>({
  id: 'room',
  initial: 'listening',
  context: {
    roomId,
    players: [],
    messages: []
  },
  states: {
    listening: {
      invoke: {
        id: 'room-subscription',
        src: (context) => watchRoom(context.roomId)
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
    imTheTargetedPlayer: (context, event: PlayerLeavedEvent) => {
      console.log('imTheTargetedPlayer', event);
      return isMe(event.player)
    },
  },

  actions: {
    addMessage: assign({ 
      messages: (context, event: NewMessageEvent) => {
        console.log('addMessage', context.messages, event.message, event);
        return [event.message, ...context.messages]
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
      messages: (context, event) => {
        return [...context.messages, { id: fakeId(), content: event.reason }]
      }
    })
  }
});
