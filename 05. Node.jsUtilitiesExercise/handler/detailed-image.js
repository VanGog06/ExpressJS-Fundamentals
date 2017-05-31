const fs = require('fs');
const path = require('path');

const database = require('../config/database');

module.exports = (req, res) => {
    if(req.path.startsWith('/detailed-image/') && req.method === 'GET') {
        let images = database.images.getAll();
        let staticPath = '/detailed-image/';
        let id = Number(req.path.slice(staticPath.length));
        let filePath = path.normalize('view/home/detailed-image.html');
        let backPath = req.headers['referer'];

        let readStream = fs.createReadStream(filePath);
        let fileData = '';

        readStream.on('data', data => {
            fileData += data;
        });

        readStream.on('end', () => {
            let image = images.find(image => image.id === id);

            let content = `
                <h2 class="image-title">${image.name}</h2>
                <img src="${image.url}" alt="Uploaded Image">
            `;

            let html = fileData
                .toString()
                .replace('{content}', content)
                .replace('{back}', backPath);

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.write(html);
            res.end();
        });

        // fs.readFile(filePath, (err, data) => {
        //     if (err) {
        //         console.log(err);
        //         return;
        //     }
        //
        //     let image = images.find(image => image.id === id);
        //
        //     let content = `
        //         <h2 class="image-title">${image.name}</h2>
        //         <img src="${image.url}" alt="Uploaded Image">
        //     `;
        //
        //     let html = data
        //         .toString()
        //         .replace('{content}', content)
        //         .replace('{back}', backPath);
        //
        //     res.writeHead(200, {
        //         'Content-Type': 'text/html'
        //     });
        //
        //     res.write(html);
        //     res.end();
        // }
    } else {
        return true;
    }
};