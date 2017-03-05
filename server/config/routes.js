var auth = require('./auth'),
    users = require('../controllers/users'),
    properties = require('../controllers/properties'),
    lists = require('../controllers/dropDownList'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app) {

  app.get('/api/lists', lists.getLists);

  //app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
  app.get('/api/users', users.getUsers);
  app.post('/api/users', users.createUser);
  app.put('/api/users/:id', users.updateUser);

  app.get('/api/properties', properties.getProperties);
  app.get('/api/properties/:id', properties.getPropertyById);
  app.get('/api/propertiesByUser/:id', properties.getPropertiesByUserId);

  app.post('/api/properties', properties.createProperty);
  app.put('/api/properties/:id', properties.updateProperty);

  app.delete('/api/properties/:id', properties.deleteProperty);

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  app.all('/api/*', function(req, res) {
    res.send(404);
  });

  app.get('*', function(req, res) {
    res.render('index', {
      bootstrappedUser: req.user
    });
  });
};

// Switching from Jade: https://ademirgabardo.wordpress.com/2016/03/04/how-to-change-the-template-system-from-jade-to-html-with-express/
module.exports.index = function(req, res){
  res.render('index', { title: 'Page title' });};