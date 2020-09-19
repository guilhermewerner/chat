require('dotenv/config');

const express = require('express');
const path = require('path');

const app = express();

/**
 * Declare HTTP and Websocket protocols
 */
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../Public')));

/**
 * Configure html view engine
 */
app.set('views', path.join(__dirname, '../Public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html')
});

let messages = [];

io.on('connection', socket => {
    console.log(`Socket ${socket.id} connected`);

    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        messages.push(data);
        socket.broadcast.emit('receiveMessage', data);
    })
})

server.listen(3333, () =>
    console.log(`Server listen on port: 3333`)
);
