const fs = require('fs');
const path = require('path');
const database = require('../config/database');

module.exports = (req, res) => {
    if (req.headers.statusheader === 'Full') {
        let filePath = path.normalize(path.join(__dirname, '../views/home/status.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log(err);
                return;
            }

            let images = database.images.getAll();
            let html = data.toString().replace('{image-count}', images.length);

            res.writeHeader(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
};