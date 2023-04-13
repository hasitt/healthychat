const users = [];

// Add user to the chat room
function addUser(id, username, room) {
  const user = { id, username, room };
  users.push(user);
  return user;
}

// Remove user from the chat room
function removeUser(id) {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// Get user from the chat room
function getUser(id) {
  return users.find(user => user.id === id);
}

// Get all users in a room
function getUsersInRoom(room) {
  return users.filter(user => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom };