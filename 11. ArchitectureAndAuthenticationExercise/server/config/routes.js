const controllers = require('../controllers');
const auth = require('./auth');

module.exports = app => {
    app.get('/', (req, res, next) => {
      if (req.query) {
        res.locals.globalError = req.query.globalError;
      }

      next();
    }, controllers.home.index);

    app.get('/users/login', controllers.user.loginGet);
    app.post('/users/login', controllers.user.loginPost);

    app.get('/users/register', controllers.user.registerGet);
    app.post('/users/register', controllers.user.registerPost);

    app.post('/users/logout', controllers.user.logout);

    app.get('/article/add', auth.isAuthenticated, controllers.article.createGet);
    app.post('/article/add', auth.isAuthenticated, controllers.article.createPost);

    app.get('/article/list', controllers.article.listAll);
    app.get('/article/details/:id', auth.isAuthenticated, controllers.article.detailedArticle);

    app.get('/article/edit/:id', auth.isAuthenticated, controllers.article.editGet);
    app.post('/article/edit/:id', auth.isAuthenticated, controllers.article.editPost);

    app.get('/article/delete/:id', auth.isInRole('Admin'), controllers.article.deleteGet);
    app.post('/article/delete/:id', auth.isInRole('Admin'), controllers.article.deletePost);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('404 Not Found!');
        res.end();
    })
};
