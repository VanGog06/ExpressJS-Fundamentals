const path = require('path');

let rootPath = path.normalize(path.join('../../'));

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost:27017/blogSystem',
        port: 1337
    },
    staging: {},
    production: {
        port: process.env.PORT
    }
};