const mongoose = require('mongoose');

const Thread = mongoose.model('Thread');
const errorHandler = require('../utilities/error-handlers');

module.exports = {
  index: (req, res) => {
    if (!req.user) {
      res.render('home/index');
    } else {
      Thread
        .find({
          $or: [
            {startedBy: req.user.username},
            {with: req.user.username}
          ]
        })
        .populate('messages')
        .sort('-createdOn')
        .then(threads => {
          for (let thread of threads) {
            for (let msg of thread.messages) {
              if (req.user.username === msg.sendBy) {
                msg.isSender = 'sender';
              } else {
                msg.isSender = 'receiver';
                msg.showLikeButtons = true;
              }

              if (msg.likedBy.indexOf(req.user.username) === -1) {
                msg.showLike = true;
              }

              msg.likedNumber = msg.likedBy.length;
            }
          }

          res.render('home/index', {
            threads: threads
          });
        })
        .catch(err => {
          res.redirect('/?globalError=' + encodeURIComponent(errorHandler.handleMongooseError(err)));
        });
    }
  },
};