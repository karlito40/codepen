const robot = require('robotjs');
const WebSocket = require('ws')
const { isEqual } = require('lodash');

const wss = new WebSocket.Server({ port: 8081 })

robot.setMouseDelay(0);

let mouse = { 
  ...robot.getMousePos(),
  isDragging: false
};
let prevMouse = mouse;

function updateMouse(x, y) {
  prevMouse = { ...mouse };
  mouse = { x, y, isDragging: mouse.isDragging };
}

(function loop() {
  if(!isEqual(mouse, prevMouse)) {
    if(mouse.isDragging) {
      robot.dragMouse(mouse.x, mouse.y);
    } else {
      robot.moveMouse(mouse.x, mouse.y);
    }
    
    prevMouse = mouse;
  }
  
  setTimeout(loop, 16);
})()

wss.on('connection', ws => {
  ws.on('message', function (message) {
    const { subject, data } = JSON.parse(message);
    console.log(subject, data);

    if(subject === 'mouse:down') {
      mouse.isDragging = true;
      robot.mouseToggle('down');
      ws.send(JSON.stringify({
        subject: 'mouse:down',
        data: { enabled: true }
      }));
    } else if(subject === 'mouse:up') {
      mouse.isDragging = false;
      robot.mouseToggle('up');
    } else if(subject === 'mouse:move') {
      const destX = mouse.x + data.x;
      const destY = mouse.y + data.y;
      updateMouse(destX, destY);  
    } else if(subject === 'mouse:click') {
      for(let i = 0; i<data.nbClick; i++) {
        robot.mouseClick(data.button, !!i);
      }
    } else if(subject === 'mouse:scroll') {
      const dir = -1;
      robot.scrollMouse(data.x * dir, data.y * dir);
    } else if(subject === 'keyboard:tap') {
      robot.keyTap(data.key);
    }
  });
})
