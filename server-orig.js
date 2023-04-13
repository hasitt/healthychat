// Importing required modules
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Set up the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up the server
http.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Handle a new connection
io.on('connection', (socket) => {
  console.log('User connected');

  // Handle a new message
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });

  // Handle a disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});
