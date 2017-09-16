const mongoose = require('mongoose');

const User = mongoose.model('User');
const Thread = mongoose.model('Thread');
const Message = mongoose.model('Message');

const errorHandler = require('../utilities/error-handlers');

module.exports = {
  chat: (req, res) => {
    let username = req.body.username;

    if (username === req.user.username) {
      res.redirect('/?globalError=' + encodeURIComponent('You cannot chat with yourself!'));
      return;
    }

    User
      .findOne({username: username})
      .then(user => {
        if (!user) {
          res.redirect('/?globalError=' + encodeURIComponent('User does not exist. Try again!'));
          return;
        }

        Thread
          .findOne({
            $and: [
              {$or: [{startedBy: username}, {startedBy: req.user.username}]},
              {$or: [{with: username}, {with: req.user.username}]}
            ]
          })
          .then(thread => {
            if (!thread) {
              let threadData = {
                startedBy: req.user.username,
                with: username,
                messages: [],
                createdOn: Date.now()
              };

              Thread
                .create(threadData)
                .then()
                .catch(err => {
                  res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
                })
            }

            res.redirect(`/thread/${username}`);
          })
          .catch(err => {
            res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
          });
      })
      .catch(err => {
        res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
      });
  },
  sendMessageGet: (req, res) => {
    let username = req.params.username;

    if (username === req.user.username) {
      res.redirect('/?globalError=' + encodeURIComponent('You cannot chat with yourself!'));
      return;
    }

    Thread
      .findOne({
        $and: [
          {$or: [{startedBy: username}, {startedBy: req.user.username}]},
          {$or: [{with: username}, {with: req.user.username}]}
        ]
      })
      .populate('messages')
      .then(thread => {
        if (!thread) {
          res.redirect('/?globalError=' + encodeURIComponent('Thread does not exist!'));
          return;
        }

        for (let msg of thread.messages) {
          if (req.user.username === msg.sendBy) {
            msg.isSender = 'sender';
          } else {
            msg.isSender = 'receiver';
            msg.showLike = true;
          }
        }

        res.render('threads/chat', {
          chatWith: username,
          messages: thread.messages,
          isBlocked: req.user.isBlocked
        });
      })
      .catch(err => {
        res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
      });
  },
  sendMessagePost: (req, res) => {
    let username = req.params.username;
    let message = req.body.message;
    let isImage = false;
    let isLink = false;

    if (message.split('').length > 1000) {
      res.redirect('/?globalError=' + encodeURIComponent('Message is too long!'));
      return;
    }

    if (message.startsWith('http') || message.startsWith('https')) {
      isLink = true;

      if (message.endsWith('.jpg') ||
        message.endsWith('.jpeg') ||
        message.endsWith('.png')) {
        isImage = true;
      }
    }

    Message
      .create({
        sendBy: req.user.username,
        sendTo: username,
        message: message,
        isImage: isImage,
        isLink: isLink
      })
      .then(message => {
        Thread
          .findOne({
            $and: [
              {$or: [{startedBy: username}, {startedBy: req.user.username}]},
              {$or: [{with: username}, {with: req.user.username}]}
            ]
          })
          .then(thread => {
            thread.messages.push(message);
            thread
              .save()
              .then(() => {
                res.redirect(`/thread/${username}`);
              });
          })
          .catch(err => {
            res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
          });
      })
      .catch(err => {
        res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
      });
  },
  blockGet: (req, res) => {
    res.render('threads/block');
  },
  blockPost: (req, res) => {
    let username = req.body.username;
    let successMessage = '';

    if (username === req.user.username) {
      res.locals.globalError = 'You cannot block yourself!';
      res.render('threads/block');
      return;
    }

    User
      .findOne({username: username})
      .then(user => {
        if (!user) {
          res.locals.globalError = 'User does not exist!';
          res.render('threads/block');
          return;
        }

        if (user.isBlocked) {
          user.isBlocked = false;
          successMessage = '/?successMessage=' + encodeURIComponent(`${username} unblocked successfully!`);
        } else {
          user.isBlocked = true;
          successMessage = '/?successMessage=' + encodeURIComponent(`${username} blocked successfully!`);
        }

        user
          .save()
          .then(() => {
            res.redirect(successMessage);
          });
      })
      .catch(err => {
        res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
      })
  },
  like: (req, res) => {
    let id = req.params.id;

    Message
      .findById(id)
      .then(message => {
        if (!message) {
          res.redirect('/?globalError=' + encodeURIComponent('Message does no exist!'));
          return;
        }

        message.likedBy.push(req.user.username);
        message
          .save()
          .then(() => {
            res.redirect(`/`);
          });
      })
      .catch(err => {
        res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
      });
  },
  dislike: (req, res) => {
    let id = req.params.id;

    Message
      .findById(id)
      .then(msg => {
        if (!msg) {
          res.redirect('/?globalError=' + encodeURIComponent('Message does no exist!'));
          return;
        }

        let index = msg.likedBy.indexOf(req.user.username);
        msg.likedBy.splice(index, 1);

        msg
          .save()
          .then(() => {
            res.redirect(`/`);
          });
      })
      .catch(err => {
        res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
      });
  }
};