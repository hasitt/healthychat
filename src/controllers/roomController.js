const Chat = require('../models/chat');

module.exports = {
  getRooms: async (req, res) => {
    try {
      const chats = await Chat.find();
      return res.render('rooms', { chats });
    } catch (err) {
      console.error(err);
      return res.render('error', { message: 'Server error' });
    }
  },
  createRoom: async (req, res) => {
    try {
      const room = req.body.room.trim().toLowerCase();
      const chat = await Chat.findOne({ room });
      if (chat) {
        return res.render('error', { message: 'Room already exists' });
      } else {
        const newChat = new Chat({ room });
        await newChat.save();
        return res.redirect(`/chat/${room}`);
      }
    } catch (err) {
      console.error(err);
      return res.render('error', { message: 'Server error' });
    }
  }
};