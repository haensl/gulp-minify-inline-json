# gulp-minify-inline-json

Minifies inline `<script>` tags containing JSON data, i.e. `application/json` and `application/ld+json`.

## Installation

```shell
npm i --save-dev gulp-minify-inline-json
```

## Usage

```javascript
const minifyInlineJSON = require('gulp-minify-inline-json');

gulp.task('minifyInlineJSON', () =>
  gulp.src('*.html')
    .pipe(minifyInlineJSON())
    .pipe(gulp.dest('dist/')));
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)

