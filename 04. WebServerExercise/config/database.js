// const fs = require('fs');
// const path = require('path');
// const dbPath = path.join(__dirname, '/database.json');
//
// let count = 1;
//
// function getProducts() {
//     if (fs.exists(dbPath)) {
//         fs.writeFile(dbPath, '[]');
//         return[];
//     }
//
//     let json = fs.readFileSync(dbPath).toString() || '[]';
//     let products = JSON.parse(json);
//     return products;
// }
//
// function saveProducts(product) {
//     let json = JSON.stringify(product);
//     fs.writeFileSync(dbPath, json);
// }
//
// module.exports.getAll = getProducts;
//
// module.exports.add = (image) => {
//     image.id = count++;
//     saveProducts(image);
// };

let images = [];
let count = 1;

module.exports.images = {};

module.exports.images.add = (image) => {
    image.id = count++;
    images.push(image);
};

module.exports.images.getAll = () => {
    return images;
};