const through = require('through2');
const cheerio = require('cheerio');
const gutil = require('gulp-util');

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
      return callback(new gutil.PluginError('gulp-minify-inline-json', 'Streams are not supported, yet.'));
    }

    const $ = cheerio.load(file.contents.toString());
    let didMinify = false;

    $(mimeTypes.map((type) => `script[type="${type}"]`).join(','))
      .each(function() {
        const script = $(this);
        const scriptText = script.contents().text().trim();

        if (scriptText.length) {
          didMinify = true;
          script.text(JSON.stringify(JSON.parse(scriptText)));
        }
      });

    if (didMinify) {
      file.contents = new Buffer($.html());
    }

    callback(null, file);
  });
