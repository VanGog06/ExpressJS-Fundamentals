const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const databaseLinks = require('../config/links');

module.exports = (req, res) => {
    if (req.path.startsWith('/download/') && req.method === 'GET') {
        let id = Number(req.path.split('/')[2]);
        let links = databaseLinks.links.getAll();
        let link = links.filter(link => {
            return link.id === id;
        });

        let fileName = link[0].name;
        let filePath = path.normalize(path.join(__dirname, `../${link[0].url}`));

        let readStream = fs.createReadStream(filePath);

        res.writeHead(200, {
            'Content-Disposition': `attachment; filename=${fileName}.jpg.gz`
        });

        let gzip = zlib.createGzip();
        readStream.pipe(gzip).pipe(res);
    } else {
        return true;
    }
};