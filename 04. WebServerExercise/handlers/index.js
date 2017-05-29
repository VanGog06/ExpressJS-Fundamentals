const homeHandler = require('./home');
const faviconHandler = require('./favicon');
const uploadImageHandler = require('./image');
const detailedImageHandler = require('./detailed-image');
const headerHandler = require('./header');
const staticFileHandler = require('./static-file');

module.exports = [
    homeHandler,
    faviconHandler,
    detailedImageHandler,
    uploadImageHandler,
    headerHandler,
    staticFileHandler
];