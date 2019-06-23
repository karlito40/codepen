import * as socketio from 'socket.io';
import * as robot from 'robotjs';

robot.setMouseDelay(0.5);

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
    if(!movement.x && !movement.y) {
      return;
    }
    
    const mouse = robot.getMousePos();
    const destX = mouse.x + movement.x;
    const destY = mouse.y + movement.y;
    
    robot.moveMouse(destX, destY);

    // const distanceMax = Math.max(Math.abs(movement.x), Math.abs(movement.y));
    // const moveBy = 1;
    // for(let distance = 0; distance < distanceMax; distance += moveBy) {
    //   const x = Math.min(mouse.x + (distance * Math.sign(movement.x)), destX);
    //   const y = Math.min(mouse.y + (distance * Math.sign(movement.y)), destY);

    //   robot.moveMouse(x, y);
    // }
  });

  socket.on('mouse:click', () => {
    robot.mouseClick();
  });
});


function updatePresence(io, socket) {
  socket.adapter.clients((error, clients) => {
    if (error) throw error;
    io.emit('change', { nbConnection: clients.length });
  });
}
