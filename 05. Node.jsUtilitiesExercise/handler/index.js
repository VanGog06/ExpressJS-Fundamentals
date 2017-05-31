const homeHandler = require('./home');
const faviconHandler = require('./favicon');
const imageHandler = require('./image');
const detailedImageHandler = require('./detailed-image');
const downloadHandler = require('./download-image');
const staticHandler = require('./static-file');

module.exports = [
    homeHandler,
    faviconHandler,
    imageHandler,
    detailedImageHandler,
    downloadHandler,
    staticHandler
];