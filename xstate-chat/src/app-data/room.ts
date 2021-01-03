// simulate apollo oberservers...
import Observable from 'zen-observable';
import { fakeMessage, fakePlayer } from '../fixtures/fakes';

export function watchRoom (roomId) {
  console.log('watchRoom', roomId) 
  return new Observable((observer) => {
    const delayEvent = (event, byMs, ack = () => {}) => setTimeout(() => {
      observer.next(event);
      ack();
    }, byMs);

    let isObservableAlive = true;
    const player1 = fakePlayer();
    const timers = [
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 2000),
      delayEvent({ type: 'PLAYER_JOINED', player: player1 }, 2200),
      delayEvent({ type: 'PLAYER_JOINED', player: fakePlayer() }, 2400),
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 4000),
      delayEvent({ type: 'PLAYER_JOINED', player: fakePlayer() }, 5000),
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 6000),
      // delayEvent({ type: 'PLAYER_LEAVED', reason: 'kicked', player: player1 }, 6200),
      delayEvent({ type: 'NEW_MESSAGE', message: fakeMessage() }, 7500),
      // delayEvent({ type: 'PLAYER_LEAVED', reason: 'self', player: fakeMe() }, 8000),
    ];


    (async function messageLoop () {
      if (!isObservableAlive) return console.log('stop loop');

      const message = fakeMessage();
      message.content = 'loop:' + message.content;
      timers.push(
        delayEvent({ type: 'NEW_MESSAGE', message: message }, 4000, messageLoop)
      );
    })();
    
    return () => {
      isObservableAlive = false;
      timers.forEach((timer) => clearTimeout(timer));
    };
  });
}