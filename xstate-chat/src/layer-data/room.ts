// simulate apollo oberservers...
import Observable from 'zen-observable';
import faker from "faker";
import { fakeMe } from './player';

const fakeId = () => faker.random.uuid();
const fakeName = () => faker.name.findName();
const fakeMessage = () => faker.lorem.sentence();
const fakePlayer = () => ({ id: fakeId(), name: fakeName() })

export function watchRoom (roomId) {
  console.log('watchRoom', roomId)
  return new Observable((observer) => {
    const delayEvent = (event, byMs) => setTimeout(() => observer.next(event), byMs);
    
    const player1 = fakePlayer();
    const timers = [
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 2000),
      delayEvent({ type: 'PLAYER_JOINED', player: player1 }, 2200),
      delayEvent({ type: 'PLAYER_JOINED', player: fakePlayer() }, 2400),
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 4000),
      delayEvent({ type: 'PLAYER_JOINED', player: fakePlayer() }, 5000),
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 6000),
      delayEvent({ type: 'PLAYER_LEAVED', reason: 'kicked', player: player1 }, 6200),
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 7500),
      delayEvent({ type: 'PLAYER_LEAVED', reason: 'self', player: fakeMe() }, 8000),
    ];
    
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  });
}