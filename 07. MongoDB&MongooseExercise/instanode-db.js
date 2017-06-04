let Tag = require('./models/Tag');
let Image = require('./models/Image');

function createTag(tagName) {
    return new Promise((resolve, reject) => {
        Tag.findOne({name: tagName})
            .then(tag => {
                if (tag) {
                    resolve(tag._id);
                    return;
                }

                Tag.create({name: tagName})
                    .then(newTag => {
                        resolve(newTag._id);
                    });
            });
    });
}

function updateTag(tagData) {
    return new Promise((resolve, reject) => {
        Tag.findOne({name: tagData.name})
            .then(tag => {
                tag.images.push(tagData.imageId);
                tag.save()
                    .then(() => {
                        resolve(`Tag with name: ${tagData.name} and image: ${tagData.imageId} was successfully updated.`);
                    });
            });
    });
}

module.exports = {
    saveImage: (imageData) => {
        let imageObj = {
            url: imageData.url,
            description: imageData.description,
            tags: []
        };

        let tagNames = imageData.tags;

        let tags = [];

        for (let tag of tagNames) {
            tags.push(
                createTag(tag)
                    .then(tagId => {
                        imageObj.tags.push(tagId);
                    })
            );
        }

        Promise.all(tags)
            .then(() => {
                Image.create(imageObj)
                    .then(newImage => {
                        for (let tag of tagNames) {
                            updateTag({name: tag, imageId: newImage._id})
                                .then(msg => {
                                    console.log(msg);
                                })
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            });
    },
    findByTag: (tagName) => {
        return new Promise((resolve, reject) => {
            Tag
                .findOne({name: tagName})
                .then(tag => {
                    Image
                        .find({tags: tag._id})
                        .sort({creationDate: -1})
                        .exec((err, images) => {
                            resolve(images);
                        });
                });
        });
    },
    filter: (data) => {
        if (!data.results) {
            data.results = 10;
        }

        if (!data.before) {
            data.before = new Date(8640000000000000);
        }

        if (!data.after) {
            data.after = new Date(-8640000000000000);
        }

        Image
            .find()
            .where('creationDate').gt(data.after).lt(data.before)
            .limit(data.results)
            .exec((err, images) => {
                console.log(images);
            });
    }
};