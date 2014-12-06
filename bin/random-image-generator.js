#!/usr/bin/env node
var randomImageGenerator = require('..');

var argv = require('yargs')
    .usage('Usage: $0 [width] [height]')
    .demand(2)
    .argv;

var width = argv._[0],
    height = argv._[1],
    image = randomImageGenerator(width, height, done);

function done(err, jpg) {
    process.stdout.write(jpg);
}
