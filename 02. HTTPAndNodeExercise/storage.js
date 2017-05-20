const fs = require('fs');
let database = {};

module.exports.database = {};

module.exports.database.put = (key, value) => {
    if (typeof key !== 'string' || !key instanceof String) {
        throw new Error(`Key ${key} is not a string.`);
    }

    if (database.hasOwnProperty(key)) {
        throw new Error(`Key ${key} already exists.`);
    }

    database[key] = value;
};

module.exports.database.get = (key) => {
    if (typeof key !== 'string' || !key instanceof String) {
        throw new Error(`Key ${key} is not a string.`);
    }

    if (!database.hasOwnProperty(key)) {
        throw new Error(`Key ${key} does not exist.`);
    }

    return database[key];
};

module.exports.database.update = (key, value) => {
    if (typeof key !== 'string' || !key instanceof String) {
        throw new Error(`Key ${key} is not a string.`);
    }

    if (!database.hasOwnProperty(key)) {
        throw new Error(`Key ${key} does not exist.`);
    }

    database[key] = value;
};

module.exports.database.delete = (key) => {
    if (typeof key !== 'string' || !key instanceof String) {
        throw new Error(`Key ${key} is not a string.`);
    }

    if (!database.hasOwnProperty(key)) {
        throw new Error(`Key ${key} does not exist.`);
    }

    delete database[key];
};

module.exports.database.clear = () => {
    database = {};
};

module.exports.database.save = () => {
    let data = JSON.stringify(database, null, 2);

    fs.writeFileSync('./storage.dat', data);
};

module.exports.database.load = () => {
    let data  = fs.readFileSync('./storage.dat');

    database = JSON.parse(data);
};

