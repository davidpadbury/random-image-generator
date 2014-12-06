var Buffer = require('buffer').Buffer,
    Jpeg = require('jpeg').Jpeg;

function randomColorComponent() {
    return Math.floor(Math.random() * 256);
}

/**
 * Creates a random image
 */
module.exports = function(width, height, callback) {
    var buffer = new Buffer(width * height * 3);

    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var pixelStart = x * width * 3 + y * 3;

            buffer[pixelStart + 0] = randomColorComponent();
            buffer[pixelStart + 1] = randomColorComponent();
            buffer[pixelStart + 2] = randomColorComponent();
        }
    }

    var image = new Jpeg(buffer, width, height);

    image.encode(function(result) {
        callback(null, result);
    });
};
