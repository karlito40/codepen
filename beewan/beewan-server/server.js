const SocketIO = require('socket.io');
const io = SocketIO.listen(3006);

io.on('connection', function(socket) {
  updatePresence(io, socket);
  socket.on('disconnect', () => {
    updatePresence(io, socket);
  });

  socket.on('matchmaking.join', () => {
    const battles = getBattles(socket);
    const battle = battles.find(battle => battle.size < 2 && battle.go === undefined);
    
    if(!battle) {
      const battleId = 'battle.' + (battles.length + 1)
      socket.join(battleId);
    } else {
      socket.join(battle.id);

      io.to(battle.id).emit('change', { 
        searching: false,
        selectedBattle: {
          ...battle,
          go: false
        }
      });

      setTimeout(function() {
        console.log('send start');
        io.to(battle.id).emit('change', { 
          selectedBattle: {
            go: true  
          }
        });
      }, 3000);
    }
    
    socket.emit('change', { battles: getBattles(socket) });
  });

  socket.on('battle.attack', ({ battleId }) => {
    const targetedRoom = socket.adapter.rooms[battleId];
    if(!targetedRoom) {
      return socket.emit('error', 'something weird happened');
    } 
    
    if(!targetedRoom.winner) {
      console.log('send winner');
      targetedRoom.winner = socket.id;
      io.to(battleId).emit('change', { 
        selectedBattle: {
          winner: targetedRoom.winner
        }
      });
    }

  });

  socket.on('battle.list', () => {
    socket.emit('change', { battles: getBattles(socket) });
  });
});

function updatePresence(io, socket) {
  socket.adapter.clients((error, clients) => {
    if (error) throw error;
    io.emit('change', { nbPlayers: clients.length });
  });
}

function getBattles(socket) {
  return Object.entries(socket.adapter.rooms).map(([roomId, room]) => ({
    id: roomId,
    size: room.length
  })).filter(room => room.id.startsWith('battle'));
}