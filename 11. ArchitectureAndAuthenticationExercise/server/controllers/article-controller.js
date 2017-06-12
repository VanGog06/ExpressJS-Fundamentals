const url = require('url');
const qs = require('querystring');

const Article = require('../model/Article').model('Article');
const errorHandler = require('../utilities/error-handlers');

module.exports = {
    createGet: (req, res) => {
        res.render('articles/add');
    },
    createPost: (req, res) => {
        let reqArticle = req.body;

        if (!reqArticle.title) {
            res.locals.globalError = 'Title field cannot be empty';
            res.locals.reqArticle = reqArticle;
            res.render('articles/add');
            return;
        }

        if (!reqArticle.description) {
            res.locals.globalError = 'Description field cannot be empty';
            res.locals.reqArticle = reqArticle;
            res.render('articles/add');
            return;
        }

        Article.create({
            title: reqArticle.title,
            description: reqArticle.description,
            creator: req.user._id
        }).then(() => {
            res.render('home/index', {
                success: 'Article created successfully'
            });
        });
    },
    listAll: (req, res) => {
        let queryData = qs.parse(url.parse(req.url).query);
        let page = 1;
        let sortMethod = 'title';
        let hasNextPage = true;
        let hasPrevPage = true;
        let isAdmin = req.user.roles.indexOf('Admin') > -1;

        if (queryData.page) {
            page = Number(queryData.page);
        }

        let prevPage = (Number(queryData.page) - 1);
        let nextPage = page + 1;

        if (queryData.sort) {
            switch(queryData.sort) {
                case 'title':
                    sortMethod = 'title';
                    break;
                    sortMethod = 'description';
                    break;
                case 'date':
                    sortMethod = 'creationDate';
                    break;
                default:
                    sortMethod = 'title';
                    break;
                case 'description':
            }
        }

        Article.find({})
            .skip((page - 1) * 3)
            .limit(3)
            .sort(sortMethod)
            .exec((err, articles) => {
                if (err) {
                    res.sendStatus(404);
                    res.render('articles/all', {
                        error: err
                    });
                }

                if (page <= 1) {
                  hasPrevPage = false;
                }

                if (articles.length !== 3) {
                  hasNextPage = false;
                }

                res.render('articles/all', {
                    articles: articles,
                    hasNext: hasNextPage,
                    hasPrev: hasPrevPage,
                    prevPage: prevPage,
                    nextPage: nextPage
                });
            });
    },
    detailedArticle: (req, res) => {
        let id = req.params.id;

        Article.findById(id)
          .populate('creator')
          .then(article => {
            if (!article) {
                res.sendStatus(404);
                res.render('article/details', {
                    error: 'The article was not found!'
                });
                return;
            }

            res.render('articles/details', {
                title: article.title,
                description: article.description,
                date: article.creationDate,
                creator: article.creator.username
            });
        });
    },
    editGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article => {
            if (!article) {
                res.sendStatus(404);
                res.render('article/all', {
                    error: 'The article was not found!'
                });
                return;
            }

            if (req.user._id.toString() === article.creator.toString() ||
                req.user.roles.indexOf('Admin') > -1) {
                res.render('articles/edit', {
                    title: article.title,
                    description: article.description,
                    id: article._id
                });
                return;
            }

            res.redirect('/');
        });
    },
    editPost: (req, res) => {
        let id = req.params.id;
        let editArticle = req.body;

        Article.findById(id).then(article => {
            if (!article) {
                res.sendStatus(404);
                res.render('article/details', {
                    error: 'The article was not found!'
                });
                return;
            }

            if (req.user._id.toString() === article.creator.toString() ||
                req.user.roles.indexOf('Admin') > -1) {
                article.title = editArticle.title;
                article.description = editArticle.description;
                article.save().then(() => {
                    res.redirect('/?globalError=' + encodeURIComponent('Article edited successfully!'));
                })
                  .catch(err => {
                    res.locals.globalError = errorHandler.handleMongooseError(err);
                    res.render('articles/edit', {
                      id: id,
                      title: article.title,
                      description: article.description
                    });
                  });
            }
        });
    },
    deleteGet: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article => {
            if (!article) {
                res.sendStatus(404);
                return;
            }

            res.render('articles/delete', {
                id: article._id,
                title: article.title,
                description: article.description
            });
        });
    },
    deletePost: (req, res) => {
        let id = req.params.id;

        Article.findById(id).then(article => {
            if (!article) {
                res.sendStatus(404);
                return;
            }

            article.remove().then(() => {
              res.redirect('/?globalError=' + encodeURIComponent('Article deleted successfully!'));
            });
        });
    }
};