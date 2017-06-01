const url = require('url');
const fs = require('fs');
const path = require('path');
const qs = require('querystring');

const Product = require('../models/Product');

module.exports = (req, res) => {
    req.pathname = req.pathname || url.parse(req.url).pathname;

    let filePath = path.normalize(
        path.join(__dirname, '../views/home/index.html'));

    if (req.pathname === '/' && req.method === 'GET') {
        //TODO: Implement more logic
        let queryData = qs.parse(url.parse(req.url).query);

        Product
            .find()
            .then(products => {
                if (queryData.query) {
                    products = products
                        .filter(product =>
                            product.name.toLowerCase().includes(queryData.query) ||
                            product.description.toLowerCase().includes(queryData.query));
                }

                loadPage(filePath, res, products);
            });
    } else {
        return true;
    }
};

function loadPage(filePath, res, products) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.log(err);
            res.writeHead(404, {
                'Content-Type': 'text/plain'
            });

            res.write('404 not found');
            res.end();
            return;
        }

        res.writeHead(200, {
            'Content-Type': 'text/html'
        });

        let content = '';

        for (let product of products) {
            content += `
                        <div class="product-card">
                            <img class="product-img" src="${product.image}">
                            <h2>${product.name}</h2>
                            <p>${product.description}</p>
                        </div>
                    `;
        }

        let html = data
            .toString()
            .replace('{content}', content);

        res.write(html);
        res.end();
    });
}