const through = require('through2');
const cheerio = require('cheerio');
const gutil = require('gulp-util');

const PLUGIN_NAME = require('./package').name;
const mimeTypes = [
  'application/json',
  'application/ld+json'
];

module.exports = () =>
  through.obj((file, encoding, callback) => {
    if (file.isNull()) {
      return callback(null, file);
    }

    if (file.isStream()) {
      return callback(new gutil.PluginError(PLUGIN_NAME, 'Streams are not supported.'));
    }

    const $ = cheerio.load(file.contents.toString());
    let didMinify = false;

    $(mimeTypes.map((type) => `script[type="${type}"]`).join(','))
      .each(function() {
        const script = $(this);
        const scriptText = script.contents().text().trim();

        if (scriptText.length) {
          try {
            script.text(JSON.stringify(JSON.parse(scriptText)));
            didMinify = true;
          } catch (e) {
            return callback(new gutil.PluginError(PLUGIN_NAME, e));
          }
        }
      });

    if (didMinify) {
      file.contents = new Buffer($.html());
    }

    callback(null, file);
  });
