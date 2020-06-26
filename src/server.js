const express = require('express');
const connectDB = require('../config/db');
const socketio = require('socket.io');
const path = require('path');
const http = require('http');
const compression = require('compression');

const { addUser, removeUser, getUser, getUserInRoom } = require('./utilities/chat-user');
const { formatMessage } = require('./utilities/chat-message');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 5000;

connectDB();

app.use(compression());
app.use(express.json({ extended: false }));

app.use('/user', require('./routes/user.route'));
app.use('/task', require('./routes/task.route'));
app.use('/profile', require('./routes/profile.route'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

io.on('connection', (socket) => {
  console.log('New connection');

  socket.on('disconnect', () => {
    console.log('User left');
  });

  socket.on('user-join', (userInfo) => {
    const user = addUser({ id: socket.id, ...userInfo });
    socket.join(user.room);

    socket.broadcast
      .to(user.room)
      .emit('message', formatMessage('Admin', `${user.username} joined!`));

    socket.emit('message', formatMessage('Admin', `${user.username}, welcome!`));

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room),
    });
  });

  socket.on('send-message', (message) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', formatMessage(user.username, message));
  });

  socket.on('user-leave', () => {
    const user = removeUser(socket.id);

    io.to(user.room).emit('message', formatMessage('Admin', `${user.username} left`));
    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUserInRoom(user.room),
    });
  });
});

server.listen(port, () => console.log(`Server started on port ${port}`));
