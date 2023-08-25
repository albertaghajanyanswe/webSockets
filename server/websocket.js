const ws = require('ws');
const PORT = 5000;

const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on 5000`))


wss.on('connection', function connection(ws) {
    ws.id = Date.now();
    console.log("\n\n\ ws = ", ws)
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message, ws.id)
                break;
            case 'connection':
                broadcastMessage(message, ws.id)
                break;
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        console.log("\n\nclient.id = ", client.id)
        console.log("id = ", id)
        client.send(JSON.stringify(message))
    })
}
