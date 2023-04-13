const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../middleware/auth');
const { getMessages, addMessage } = require('../controllers/messages');

// GET home page
router.get('/', (req, res) => {
  res.render('index');
});

// GET chat page
router.get('/chat', ensureAuthenticated, async (req, res) => {
  const messages = await getMessages();
  res.render('chat', { user: req.user, messages });
});

// POST new message
router.post('/messages', ensureAuthenticated, async (req, res) => {
  const { message } = req.body;
  if (!message) {
    res.redirect('/chat');
    return;
  }
  await addMessage(req.user.username, message);
  res.redirect('/chat');
});

module.exports = router;