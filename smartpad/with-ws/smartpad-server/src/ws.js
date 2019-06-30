const robot = require('robotjs');
const WebSocket = require('ws')
const { clamp, isEqual } = require('lodash');

const wss = new WebSocket.Server({ port: 8081 })

robot.setMouseDelay(0);

let mouse = robot.getMousePos();
let prevMouse = mouse;
// const screenSize = robot.getScreenSize();

function updateMouse(x, y) {
  prevMouse = { ...mouse };
  mouse = {
    x, 
    y
    // x: clamp(x, 0, screenSize.width),
    // y: clamp(y, 0, screenSize.height)
  }
}

(function loop() {
  if(!isEqual(mouse, prevMouse)) {
    robot.moveMouse(mouse.x, mouse.y);
  }
  
  setTimeout(loop, 16);
})()

wss.on('connection', ws => {
  ws.on('message', function incoming(message) {
    // console.log('message', message);
    const { subject, data } = JSON.parse(message);

    if(subject === 'mouse:move') {
      // console.log('mouse:move received', data, Date.now());
      const destX = mouse.x + data.x;
      const destY = mouse.y + data.y;
      updateMouse(destX, destY);  
    } else if(subject === 'keyboard:tap') {
      console.log('tap', data.key);
      robot.keyTap(data.key);
    } else if(subject === 'mouse:click') {
      robot.mouseClick();
    }
  });
})
