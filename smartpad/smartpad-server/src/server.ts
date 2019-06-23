import * as socketio from 'socket.io';
import * as robot from 'robotjs';

robot.setMouseDelay(1);

const port = 81;
const io = socketio(port);
console.log('socket listening on port', port)

io.on('connection', function(socket) {
  console.log('client connect - ', socket.id);
  updatePresence(io, socket);

  socket.on('reconnect', (attemptNumber) => {
    console.log('client reconnect - ', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('client disconnect - ', socket.id);
    updatePresence(io, socket);
  });

  socket.on('mouse:move', (movement) => {
    console.log('mouse:move received', movement);
    const mouse = robot.getMousePos();
    const destX = mouse.x + movement.x;
    const destY = mouse.y + movement.y;
    if(destX || destY) {
      robot.moveMouse(destX, destY);
      console.log(`mouse dest [${destX}, ${destY}]`);
    }
    
  });
});


function updatePresence(io, socket) {
  socket.adapter.clients((error, clients) => {
    if (error) throw error;
    io.emit('change', { nbConnection: clients.length });
  });
}
