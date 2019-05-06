import { writable } from 'svelte/store';

export default writable({
  connected: false,
  searching: false,
  nbPlayers: 0,
  battles: [],
  selectedBattle: undefined
})

/*
battle:{ 
  "id": "battle.2", 
  "startedAt": 1556882621529, 
  "actived": false, 
  "winner": "zakQc4_IIO20gK36AAAI", 
  "completedAt": 1556882622202 
} 
*/