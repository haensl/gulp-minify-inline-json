# gulp-minify-inline-json

[![NPM](https://nodei.co/npm/gulp-minify-inline-json.png?downloads=true)](https://nodei.co/npm/gulp-minify-inline-json/)

[![npm version](https://badge.fury.io/js/gulp-minify-inline-json.svg)](http://badge.fury.io/js/gulp-minify-inline-json)
[![CircleCI](https://circleci.com/gh/haensl/gulp-minify-inline-json.svg?style=svg)](https://circleci.com/gh/haensl/gulp-minify-inline-json)

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

## Options

### mimeTypes `Array<string>`

Provide custom mime types to specify which `<script>` tags to minify.

##### default: `[ 'application/json', 'application/ld+json' ]`

##### Example: Minify only tags with `type="application/ld+json"`

###### HTML Layout
```html
<html>
  <head><!-- ... --></head>
  <body>
    <!-- ... -->
    <script type="application/json">{
      "some": "json"
    }</script>
    <script type="application/ld+json">{
      "foo": "bar"
    }</script>
  </body>
</html>
```

###### Gulp task
```javascript
  const minifyJSON = require('gulp-minify-inline-json');

  gulp.task('minifyJSON', () =>
    gulp.src('*.html')
      .pipe(minifyJSON({
        mimeTypes: [
          'application/ld+json'
        ]
      }))
      .pipe(gulp.dest('dist/')));
```

###### Output
```html
<html>
  <head><!-- ... --></head>
  <body>
    <!-- ... -->
    <script type="application/json">{
      "some": "json"
    }</script>
    <script type="application/ld+json">{"foo":"bar"}</script>
  </body>
</html>
```

## [Changelog](CHANGELOG.md)

## [License](LICENSE)

