const fs = require('fs');
const path = require('path');

let getContentType = (url) => {
    let contentType = 'text/plain';

    if (url.endsWith('.html')) {
        contentType = 'text/html';
    } else if (url.endsWith('.css')) {
        contentType = 'text/css';
    } else if (url.endsWith('.js')) {
        contentType = 'application/javascript';
    } else if (url.endsWith('.jpg')) {
        contentType = 'image/jpeg'
    }

    return contentType;
};

module.exports = (req, res) => {
    if (req.path.startsWith('/content/') && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, `..${req.path}`));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': getContentType(req.path)
            });
            res.write(data);
            res.end();
        })
    } else {
        return true;
    }
};