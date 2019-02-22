const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', socket => {
    console.log('IO Connection');

    socket.on('createMessage', data => {
        console.log('Server', data);
        socket.emit('newMessage', {
            text: data.value,
            date: new Date()
        });
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server Run on port ' + PORT);
});
