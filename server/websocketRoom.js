const ws = require('ws');
const PORT = 5000;

const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on 5000`))


wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        console.log("message = ", message)
        ws.roomId = message.roomId;
        switch (message.event) {
            case 'message':
                broadcastMessage(message, ws.roomId)
                break;
            case 'connection':
                broadcastMessage(message, ws.roomId)
                break;
        }
    })
})

function broadcastMessage(message, roomId) {
    wss.clients.forEach(client => {
        if (client.roomId === roomId) {
            client.send(JSON.stringify(message))
        }
    })
}
