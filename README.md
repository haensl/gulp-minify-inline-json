# gulp-minify-inline-json

[![NPM](https://nodei.co/npm/gulp-minify-inline-json.png?downloads=true)](https://nodei.co/npm/gulp-minify-inline-json/)

[![npm version](https://badge.fury.io/js/gulp-minify-inline-json.svg)](http://badge.fury.io/js/gulp-minify-inline-json)
[![Build Status](https://travis-ci.org/haensl/gulp-minify-inline-json.svg?branch=master)](https://travis-ci.org/haensl/gulp-minify-inline-json)

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

