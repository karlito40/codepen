import * as Server from 'socket.io';
import * as robot from 'robotjs';
import { clamp, isEqual } from 'lodash';

robot.setMouseDelay(0);

const port = 81;
const io = new Server(port, {
  pingInterval: 2000
});

let mouse = robot.getMousePos();
let prevMouse = mouse;
const screenSize = robot.getScreenSize();

function updateMouse(x, y) {
  prevMouse = { ...mouse };
  mouse = {
    x: clamp(x, 0, screenSize.width),
    y: clamp(y, 0, screenSize.height)
  }
}

(function loop() {
  if(!isEqual(mouse, prevMouse)) {
    robot.moveMouse(mouse.x, mouse.y);
  }
  
  setTimeout(loop, 16);
})()

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

  socket.on('mouse:velocity', (velocity) => {
    console.log('mouse:velocity received', velocity)
    if (velocity.x || velocity.y) {
      const destX = mouse.x + velocity.x;
      const destY = mouse.y + velocity.y;
      updateMouse(destX, destY);
    } 
  });

  socket.on('mouse:move', (movement) => {
    console.log('mouse:move received', movement, Date.now());
    const mouse = robot.getMousePos();
    const destX = mouse.x + movement.x;
    const destY = mouse.y + movement.y;
    updateMouse(destX, destY);  
  });
  
  socket.on('mouse:target_view', (e) => {
    console.log('mouse:target_view received', e);
    const destX = screenSize.width * e.left;
    const destY = screenSize.height * e.top;
    console.log(destX, destY)
    robot.moveMouseSmooth(destX, destY);
  });

  socket.on('mouse:click', () => {
    console.log('mouse:click received');
    robot.mouseClick();
  });
});


function updatePresence(io, socket) {
  socket.adapter.clients((error, clients) => {
    if (error) throw error;
    io.emit('change', { nbConnection: clients.length });
  });
}
