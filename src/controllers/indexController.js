const User = require('../models/user');

const indexController = {
  getIndex: async (req, res) => {
    try {
      const users = await User.find();
      res.render('index', { users });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  }
};

module.exports = indexController;