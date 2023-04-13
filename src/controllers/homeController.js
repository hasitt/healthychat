module.exports = {
    getHomePage: (req, res) => {
      res.render('index', { title: 'Healthy Chat' });
    }
  };