const WebSocket = require('ws')

function noop () {}

function heartbeat () {
  this.isAlive = true
}

const wss = new WebSocket.Server({ port: 8080 })

wss.on('connection', function connection (ws) {
  console.log('connection 链接')
  ws.isAlive = true
  ws.on('pong', heartbeat)
  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`服务器返回:, ${data}`)
      }
    })
  })
})

const interval = setInterval(function ping () {
  wss.clients.forEach(function each (ws) {
    if (ws.isAlive === false) return ws.terminate()

    ws.isAlive = false
    // ws.ping(noop)
  })
}, 5000)

wss.on('close', function close () {
  console.log('close')
  clearInterval(interval)
})
