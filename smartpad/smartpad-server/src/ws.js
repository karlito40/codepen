const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8081 })

wss.on('connection', ws => {
  // ws.on('message', ts => {
  //   console.log(`Received message => ${Date.now() - ts}`)
  // })

  setInterval(() => {
    ws.send(Date.now())
  }, 100)
  ws.on('message', function incoming(message) {
      console.log(`Latency ${(Date.now() - +message) / 2}`)
  });
  ws.send('ho!')
})
