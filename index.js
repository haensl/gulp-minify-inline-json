const through = require('through2');
const PluginError = require('plugin-error');
const minifyInlineJson = require('minify-inline-json');

const PLUGIN_NAME = require('./package').name;
const DEFAULTS = {
  mimeTypes: [
    'application/json',
    'application/ld+json'
  ]
};

module.exports = (opts = {}) =>
  through.obj((file, encoding, callback) => {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new PluginError(PLUGIN_NAME, 'Streams are not supported.'));
    }

    if (typeof opts.mimeTypes === 'string') {
      opts.mimeTypes = [ opts.mimeTypes];
    }

    const options = Object.assign({}, DEFAULTS, opts);

    if (!Array.isArray(options.mimeTypes)) {
      return callback(new PluginError(PLUGIN_NAME, 'Invalid option: mimeTypes must be string or Array of strings'));
    }

    file.contents = Buffer.from(minifyInlineJson(file.contents.toString(), options));

    callback(null, file);
  });
