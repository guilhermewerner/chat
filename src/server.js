const express = require('express');
const path = require('path');

const app = express();

/**
 * Declare HTTP and Websocket protocols
 */
const server = require('http').createServer(app);
const socket = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../public')));

/**
 * Configure html view engine
 */
app.set('views', path.join(__dirname, '../public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
    res.render('index.html')
});

app.listen(3000, () =>
    console.log(`Server listen on port: 3000`)
);
