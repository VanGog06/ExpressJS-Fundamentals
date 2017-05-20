const assert = require('assert');
const fs = require('fs');
let storage = require('./storage').database;

describe('Test storage functionality', () => {
    beforeEach(() => {
        storage = require('./storage').database;
    });

    describe('Test get()', () => {
        it('should throw an Error when key is omitted', () => {
            assert.throws(() => {
                storage.get();
            }, Error);
        });

        it('should throw an Error when key is not a String', () => {
            assert.throws(() => {
                storage.get(12);
            }, Error);
        });

        it('should throw an Error when key is not a String', () => {
            assert.throws(() => {
                storage.get({"name": 12});
            }, Error);
        });

        it('should throw an Error when the key does not exist', () => {
            assert.throws(() => {
                storage.get('pesho');
            }, Error);
        });

        it('should return a value with a string key', () => {
            let expectedValue = 'gosho';

            storage.put('name', 'gosho');
            assert.equal(expectedValue, storage.get('name'));
        });

        it('should return a value when called with an existing key', () => {
            let expectedValue = 6;

            storage.put('grade', 6);
            assert.equal(expectedValue, storage.get('grade'));
        });
    });

    describe('Test put()', () => {
        it('should throw an Error with non-string key', () => {
            assert.throws(() => {
                storage.put(12, 'Kolio');
            }, Error);
        });

        it('should throw an Error with non-string key', () => {
            assert.throws(() => {
                storage.put({'name': 'pesho'}, 'Kolio');
            }, Error);
        });

        it('should throw an Error when the key already exists', () => {
            assert.throws(() => {
                storage.put('name', 'pesho');
                storage.put('name', 'Kolio');
            }, Error);
        });

        it('should return "pesho" with "name" key', () => {
            let expectedValue = 'Sofia';

            storage.put('city', 'Sofia');
            assert.equal(expectedValue, storage.get('city'));
        });

        it('should return "Sofia" with "city" key', () => {
            let expectedResult = 25;
            storage.put('student', 'pesho');
            storage.put('age', 25);
            storage.put('marks', [5, 6, 4]);

            assert.equal(expectedResult, storage.get('age'));
        });
    });

    describe('Test update()', () => {
        it('should throw an Error with non-string key', () => {
            assert.throws(() => {
                storage.update(12, 'Kolio');
            }, Error);
        });

        it('should throw an Error with non-string key', () => {
            assert.throws(() => {
                storage.update({'name': 'pesho'}, 'Kolio');
            }, Error);
        });

        it('should throw an Error when the key does not exist', () => {
            assert.throws(() => {
                storage.update('school', 'SoftUni');
            }, Error);
        });

        it('should update the corresponding entry', () => {
            storage.put('mark', 4);
            storage.update('mark', 6);

            let expectedResult = 6;
            let actualValue = storage.get('mark');

            assert.equal(expectedResult, actualValue);
        });
    });

    describe('Test delete()', () => {
        it('should throw an Error with non-string key', () => {
            assert.throws(() => {
                storage.delete(12);
            }, Error);
        });

        it('should throw an Error with non-string key', () => {
            assert.throws(() => {
                storage.delete({'name': 'pesho'});
            }, Error);
        });

        it('should throw an Error when the key does not exist', () => {
            assert.throws(() => {
                storage.delete('school');
            }, Error);
        });

        it('should delete the corresponding entry', () => {
            storage.put('isReady', true);
            storage.delete('isReady');

            assert.throws(() => {
                storage.get('isReady');
            }, Error);
        });
    });

    describe('Test clear()', () => {
        it('should erase everything from the collection', () => {
            storage.put('one', 1);
            storage.put('two', 2);

            storage.clear();

            assert.throws(() => {
                storage.get('one');
            }, Error);

            assert.throws(() => {
                storage.get('two');
            }, Error);
        });
    });

    describe('Test load() and save()', () => {
        it('should save and then load the file correctly', () => {
            storage.put('name', 'pesho');

            storage.save();
            storage.clear();
            storage.load();

            assert.equal('pesho', storage.get('name'));
        });

        it('should save and then load the file correctly', () => {
            storage.put('one', 1);
            storage.put('two', 2);

            storage.save();
            storage.clear();
            storage.load();

            assert.equal(1, storage.get('one'));
            assert.equal(2, storage.get('two'));
        });
    });
});