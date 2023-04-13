const io = require('socket.io-client');
const socket = io();

// get DOM elements
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages');

// add event listeners
messageForm.addEventListener('submit', event => {
  event.preventDefault();
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chat message', message);
    messageInput.value = '';
  }
});

socket.on('chat message', message => {
  const listItem = document.createElement('li');
  listItem.textContent = message;
  messagesList.appendChild(listItem);
});