/*   The app should be available on: https://nodeutilities.herokuapp.com/   */

const http = require('http');
const url = require('url');

const port = process.env.PORT || 1337;
const handlers = require('./handler');

http
    .createServer((req, res) => {
        req.path = url.parse(req.url).pathname;

        for (let handler of handlers) {
            let next = handler(req, res);

            if (!next) {
                break;
            }
        }
    })
    .listen(port);

console.log(`Server is listening on port ${port}...`);