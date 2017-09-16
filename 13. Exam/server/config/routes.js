const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
  app.get('/', ((req, res, next) => {
    if (req.query.successMessage) {
      res.locals.successMessage = req.query.successMessage;
    }

    if (req.query.globalError) {
      res.locals.globalError = req.query.globalError;
    }

    next();
  }), controllers.home.index);
  app.post('/', auth.isAuthenticated, controllers.threads.chat);
  app.get('/thread/:username', auth.isAuthenticated, controllers.threads.sendMessageGet);
  app.post('/thread/:username', auth.isAuthenticated, controllers.threads.sendMessagePost);

  app.get('/users/register', controllers.users.registerGet);
  app.post('/users/register', controllers.users.registerPost);

  app.get('/users/block', auth.isAuthenticated, controllers.threads.blockGet);
  app.post('/users/block', auth.isAuthenticated, controllers.threads.blockPost);

  app.get('/like/:id', auth.isAuthenticated, controllers.threads.like);
  app.get('/dislike/:id', auth.isAuthenticated, controllers.threads.dislike);

  app.post('/users/logout', controllers.users.logout);

  app.get('/users/login', controllers.users.loginGet);
  app.post('/users/login', controllers.users.loginPost);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Nor Found!');
    res.end();
  });
};