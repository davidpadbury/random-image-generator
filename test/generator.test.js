var assert = require('assert'),
    crypto = require('crypto'),
    async = require('async'),
    generator = require('..');

describe('generating a random image', function() {

    function generateImageAndHash(width, height) {
        return function(callback) {
            generator(width, height, function(err, result) {
                var md5 = crypto.createHash('md5');

                md5.update(result);

                var digest = md5.digest('base64');

                callback(null, digest);
            });
        };
    }

    it('should give different results when called twice', function(done) {
        var md5 = crypto.createHash('md5'),
            generate = generateImageAndHash.bind(null, 400, 400);

        async.parallel([ generate(), generate() ], function(err, results) {
            var image1Hash = results[0],
                image2Hash = results[1];

            assert.ok(image1Hash !== image2Hash, 'Hashes from random images should be different');
            done();
        });
    });

});
