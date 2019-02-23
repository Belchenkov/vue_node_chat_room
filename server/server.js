const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');
const users = require('./users')();

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const message = (name, text, id) => ({name, text, id});

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

io.on('connection', socket => {
    socket.on('join', (user, callback) => {
        if (!user.name || !user.room) {
            return callback('Enter valid user data!');
        }
        callback({userId: socket.id});
        socket.emit('message:new', message('Admin', `Welcome, ${user.name}!`));
    });
    socket.on('message:create', (data, callback) => {
        if (!data) {
            callback(`Message can't be empty`);
        } else {
            callback();
            io.emit('message:new', message(data.name, data.text, data.id));
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server Run on port ' + PORT);
});
