const fs = require('fs');
const path = require('path');
const multiparty = require('multiparty');
const shortid = require('shortid');
const database = require('../config/database');

let errors = {
    'name': '',
    'url': ''
};

// function checkFormFields(name, url) {
//     let errorMessage = '';
//
//     if (!name && !url) {
//         errorMessage = 'Please fill in the name field and submit a file';
//     } else if (!name) {
//         errorMessage = 'Please fill in the name field';
//     } else if (!url) {
//         errorMessage = 'Please submit a non-empty url';
//     }
//
//     return errorMessage;
// }

module.exports = (req, res) => {
    let backPath = req.headers['referer'];

    if (req.path === '/image/add' && req.method === 'GET') {
        let filePath = path.normalize(path.join(__dirname, '../views/add-image/upload-image.html'));

        fs.readFile(filePath, (err, data) => {
            if (err) {
                console.log('err');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            let html = data
                .toString()
                .replace('{back}', backPath);

            res.write(html);
            res.end();
        });
    } else if (req.path === '/image/add' && req.method === 'POST') {
        let form = new multiparty.Form();
        let image = {};

        form.on('part', (part) => {
            if (part.name === 'url') {
                let dataString = '';

                part.setEncoding('binary');
                part.on('data', (data) => {
                    dataString += data;
                });

                part.on('end', () => {
                    let extensionName = path.extname(part.filename);
                    let fileName = shortid.generate() + extensionName;

                    let filePath = path.normalize(path.join(__dirname, `../content/images/uploaded/${fileName}`));

                    image.url = `/content/images/uploaded/${fileName}`;

                    if (!dataString) {
                        errors['url'] = 'Url field cannot be empty!';
                        return;
                    } else {
                        fs.writeFile(`${filePath}`, dataString, {encoding: 'ascii'}, (err) => {
                            if (err) {
                                console.log(err);
                                return;
                            }
                        });
                    }
                });
            } else {
                part.setEncoding('utf-8');
                let field = '';

                part.on('data', (data) => {
                    field += data;
                });

                part.on('end', () => {
                    if (!field) {
                        errors['name'] = 'Name field cannot be empty!';
                        return;
                    } else {
                        image[part.name] = field;
                    }
                });
            }
        });

        form.on('close', () => {
            if (errors.url.length || errors.name.length) {
                let errorPath = path.normalize(path.join(__dirname, '../views/error/error.html'));

                fs.readFile(errorPath, (err, data) => {
                    if (err) {
                        console.log(err);
                        return;
                    }

                    let html = data
                        .toString()
                        .replace('{name-error}', errors.name)
                        .replace('{url-error}', errors.url)
                        .replace('{back}', backPath);

                    errors = {
                        'name': '',
                        'url': ''
                    };

                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    });

                    res.write(html);
                    res.end();
                });
            } else {
                database.images.add(image);

                res.writeHead(302, {
                    Location: '/'
                });

                res.end();
            }
        });

        form.parse(req);
    } else {
        return true;
    }
};