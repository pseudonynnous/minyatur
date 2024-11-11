const Minyatur = require('./core/slider.js').default;

globalThis.Minyatur = Minyatur;

// https://stackoverflow.com/questions/35971042/how-to-correctly-use-es6-export-default-with-commonjs-require
module.exports = Minyatur;
