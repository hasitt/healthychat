const Chat = require('../models/chat');

module.exports = {
  getChatRoom: async (req, res) => {
    try {
      const chat = await Chat.findOne({ room: req.params.room });
      if (chat) {
        return res.render('chat', { room: chat.room });
      } else {
        const newChat = new Chat({ room: req.params.room });
        await newChat.save();
        return res.render('chat', { room: newChat.room });
      }
    } catch (err) {
      console.error(err);
      return res.render('error', { message: 'Server error' });
    }
  },
  postMessage: async (req, res) => {
    try {
      const chat = await Chat.findOne({ room: req.params.room });
      if (chat) {
        chat.messages.push(req.body.message);
        await chat.save();
        res.sendStatus(200);
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  },
  getMessages: async (req, res) => {
    try {
      const chat = await Chat.findOne({ room: req.params.room });
      if (chat) {
        return res.json(chat.messages);
      } else {
        return res.sendStatus(404);
      }
    } catch (err) {
      console.error(err);
      return res.sendStatus(500);
    }
  }
};