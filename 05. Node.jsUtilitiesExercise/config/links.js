const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '/links.json');

function getLinks() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, '[]');
        return [];
    }

    let json = fs.readFileSync(dbPath).toString() || '[]';
    let links = JSON.parse(json);
    return links;
}

function saveLinks(links) {
    let json = JSON.stringify(links);
    fs.writeFileSync(dbPath, json);
}

module.exports.links = {};

module.exports.links.add = (link) => {
    let links = getLinks();
    link.id = links.length + 1;
    links.push(link);
    saveLinks(links);
};

module.exports.links.getAll = getLinks;