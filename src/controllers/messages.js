const Message = require('../models/message');

async function getAllMessages(req, res) {
  try {
    const messages = await Message.find({});
    res.json(messages);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

async function createMessage(req, res) {
  try {
    const message = new Message({
      text: req.body.text,
      user: req.body.user
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
}

module.exports = {
  getAllMessages,
  createMessage
};