const database = require('./database/database');
const instanodeDb = require('./instanode-db');

//let minDate = new Date("2017-05-31T16:21:42.368Z");
//let maxDate = new Date();

let minDate = new Date(-8640000000000000);
let maxDate = new Date("2017-05-31T16:21:45.368Z")

database()
    .then(() => {
        // instanodeDb.saveImage({
        //     url: 'https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg',
        //     description: 'such cat much wow',
        //     tags: ['cat', 'kitty', 'cute','catstagram']
        // });

        // instanodeDb
        //     .findByTag('cat')
        //     .then(images => {
        //         images.forEach(image => {
        //             console.log(image);
        //         });
        //     });

        //instanodeDb.filter({after: minDate, before: maxDate, results: 2})
    });