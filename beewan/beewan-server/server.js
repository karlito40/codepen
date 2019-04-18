const SocketIO = require('socket.io');
const io = SocketIO.listen(3006);

io.on('connection', function(socket) {
  updatePresence(io, socket);
  socket.on('disconnect', () => {
    updatePresence(io, socket);
  });

  socket.on('matchmaking.join', () => {
    const rooms = getBattleRooms(socket);
    let room = rooms.find(room => room.length < 2 && !room.battle.startedAt);
    
    if(!room) {
      const battle = { id: 'battle.' + (rooms.length + 1) };

      socket.join(battle.id);
      socket.battleId = battle.id;
      socket.adapter.rooms[battle.id].battle = battle;
    } else {
      const { battle } = room;
      battle.startedAt = Date.now();
      battle.actived = false;

      socket.join(battle.id);
      socket.battleId = battle.id;

      io.to(battle.id).emit('change', { 
        searching: false,
        selectedBattle: battle
      });

      battle._timeout = setTimeout(function() {
        battle.actived = true;

        console.log('send start');
        io.to(battle.id).emit('change', { 
          selectedBattle: { actived: battle.actived }
        });
      }, 3000);
    }
    
    socket.emit('change', { battles: getBattleList(socket) });
  });

  socket.on('battle.attack', () => {
    const { battleId } = socket;
    const room = socket.adapter.rooms[battleId];
    
    // cette erreur se produit lorqu'on a perdu les rooms
    // après un redemarrage du serveur
    if(!room) {
      // envoyer seulement   "error" throw une erreur
      return socket.emit('beewan.error', 'something weird happened');
    }
    
    const { battle } = room;
    if(battle._timeout) {
      clearTimeout(battle._timeout);
      battle._timeout = undefined;
    }
    
    
    if(!battle.winner) {
      console.log('send winner');
      battle.winner = (!battle.actived)
        ? getOpponent(socket, room)
        : socket.id;

      battle.completedAt = Date.now();

      io.to(battleId).emit('change', { 
        selectedBattle: {
          winner: battle.winner,
          completedAt: battle.completedAt
        }
      });
    }
  });

  socket.on('battle.list', () => {
    socket.emit('change', { battles: getBattleList(socket) });
  });
});

function updatePresence(io, socket) {
  socket.adapter.clients((error, clients) => {
    if (error) throw error;
    io.emit('change', { nbPlayers: clients.length });
  });
}

function getBattleRooms(socket) {
  return Object.values(socket.adapter.rooms)
    .filter((room) => room.battle);
}

function getBattleList(socket) {
  return getBattleRooms(socket).map((room) => ({
    id: room.battle.id,
    size: room.length
  }));
}

function getOpponent(socket, room) {
  return Object.keys(room.sockets).find(opponentId => opponentId !== socket.id);
}