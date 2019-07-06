const robot = require('robotjs');
const WebSocket = require('ws')
const { isEqual } = require('lodash');

const wss = new WebSocket.Server({ port: 8081 })

robot.setMouseDelay(0);

let mouse = robot.getMousePos();
let prevMouse = mouse;

function updateMouse(x, y) {
  prevMouse = { ...mouse };
  mouse = { x, y };
}

(function loop() {
  if(!isEqual(mouse, prevMouse)) {
    robot.moveMouse(mouse.x, mouse.y);
    prevMouse = mouse;
  }
  
  setTimeout(loop, 16);
})()

wss.on('connection', ws => {
  ws.on('message', function incoming(message) {
    const { subject, data } = JSON.parse(message);

    if(subject === 'mouse:move') {
      const destX = mouse.x + data.x;
      const destY = mouse.y + data.y;
      updateMouse(destX, destY);  
    } else if(subject === 'keyboard:tap') {
      robot.keyTap(data.key);
    } else if(subject === 'mouse:click') {
      robot.mouseClick();
    } else if(subject === 'mouse:scroll') {
      const dir = -1;
      robot.scrollMouse(data.x * dir, data.y * dir);
    }
  });
})
