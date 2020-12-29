export type Player = {
  id: string;
  name: string;
}

export function fakeMe (): Player {
  return {
    id: 'thisOneIsMine',
    name: 'nourse'
  }
}

export function isMe (player: Player) {
  return player.id === 'thisOneIsMine';
}