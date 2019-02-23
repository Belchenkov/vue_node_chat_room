const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const message = (name, text) => ({name, text});

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', socket => {
    socket.on('message:create', (data, callback) => {
        if (!data) {
            callback(`Message can't be empty`);
        } else {
            callback();
            io.emit('message:new', message('admin', data.text));
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server Run on port ' + PORT);
});
