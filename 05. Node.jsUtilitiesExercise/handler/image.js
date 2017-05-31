const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const shortid = require('shortid');

const database = require('../config/database');
const linksDatabase = require('../config/links');

function checkFormFields(fields, file) {
    let errors = {};

    if (!fields.name) {
        errors['name'] = 'Please fill in the name field';
    }

    if (file.name === '') {
        errors['url'] = 'Please submit a valid file.';
    }

    return errors;
}

module.exports = (req, res) => {
    let backPath = req.headers['referer'];

    if(req.path === '/image/add' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../view/upload/upload.html'));
        let readStream = fs.createReadStream(filePath);

        let fileData = '';

        readStream.on('data', data => {
            fileData += data;
        });

        readStream.on('end', () => {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let html = fileData
                .toString()
                .replace('{back}', backPath);

            res.write(html);
            res.end();
        });
    } else if (req.path === '/image/add' && req.method === 'POST') {
        let form = new formidable.IncomingForm();
        let image = {};
        let link = {};

        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                return;
            }

            let uploadedFile = files['url'];
            let errors = checkFormFields(fields, uploadedFile);

            if (errors.name || errors.url) {
                let filePath = path.normalize(path.join(__dirname, '../view/error/error.html'));
                let readStream = fs.createReadStream(filePath);

                let fileData = '';

                readStream.on('data', data => {
                    fileData += data;
                });

                readStream.on('end', () => {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    let html = fileData
                        .toString()
                        .replace('{back}', backPath)
                        .replace('{name-error}', errors.name || '')
                        .replace('{url-error}', errors.url || '');

                    res.write(html);
                    res.end();
                });
            } else {
                let imageCount = database.images.getAll().length;
                let folderName = imageCount % 1000;
                let filePath = path.normalize(path.join(__dirname, `../content/image/upload/${folderName}/`));
                let fileName = shortid.generate();
                let extension = path.extname(uploadedFile.name);


                if (!fs.exists(filePath)) {
                    fs.mkdir(filePath, (err) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                    });
                }

                let newFilName = `${filePath}${fileName}${extension}`;

                fs.rename(uploadedFile.path, newFilName, err => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    if (!fields.checkbox) {
                        image.url = `/content/image/upload/${folderName}/${fileName}${extension}`;
                        image.name = fields.name;
                        database.images.add(image);
                    }

                    link.url = `/content/image/upload/${folderName}/${fileName}${extension}`;
                    link.name = fields.name;
                    linksDatabase.links.add(link);

                    res.writeHead(302, {
                        Location: '/'
                    });

                    res.end();
                });
            }
        });
    } else {
        return true;
    }
};