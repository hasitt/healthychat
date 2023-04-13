// Import necessary modules
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

// Set up the express app and create an http server
const app = express();
const server = http.createServer(app);

// Set up the socket.io server
const io = socketIo(server);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route handler for the home page
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Listen for incoming socket connections
io.on('connection', function(socket) {
  console.log('a user connected');

  // Listen for incoming chat messages
  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);

    // Broadcast the message to all connected sockets
    io.emit('chat message', msg);
  });

  // Listen for when a user disconnects
  socket.on('disconnect', function() {
    console.log('user disconnected');
  });
});

// Start the server listening on port 3000
server.listen(3000, function() {
  console.log('Server listening on port 3000');
});