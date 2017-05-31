const fs = require('fs');
const path = require('path');
const url = require('url');

const database = require('../config/database');

module.exports = (req, res) => {
    if (req.path === '/' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../view/home/index.html'));
        let readStream = fs.createReadStream(filePath);

        let fileData = '';

        readStream.on('data', data => {
            fileData += data;
        });

        readStream.on('end', () => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let content = '';
            let images = database.images.getAll();

            for (let image of images) {
                content +=
                    `<div class='image-card'>
                        <h2>${image.name}</h2>
                        <img src = '${image.url}'>
                        <a href='/detailed-image/${image.id}'>More Details</a>
               </div>`;
            }

            let html = fileData
                .toString()
                .replace('{content}', content);

            res.write(html);
            res.end();
        });
    } else {
        return true;
    }
};
