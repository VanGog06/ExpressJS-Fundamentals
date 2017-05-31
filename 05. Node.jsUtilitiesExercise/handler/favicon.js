const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    if (req.path === '/favicon.ico' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../content/image/favicon.ico'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'image/x-icon'
            });

            res.write(data);
            res.end();
        });
    } else {
        return true;
    }
};