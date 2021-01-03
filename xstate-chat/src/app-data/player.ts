import { Player } from "./types";

export function isMe (player: Player) {
  return player.id === 'thisOneIsMine';
}