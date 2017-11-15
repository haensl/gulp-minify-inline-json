const path = require('path');
const expect = require('chai').expect;
const gulp = require('gulp');
const through = require('through2');
//const File = require('vinyl');

const minifier = require('../');

const fixtures = (glob) => path.join(__dirname, 'fixtures', glob);

describe('gulp-minify-inline-json', () => {
  describe('application/json', () => {
    const expected = [
      '{"type":"json","parent":"head"}',
      '{"type":"json","parent":"body"}'
    ];
    let output;

    beforeEach((done) => {
      gulp.src(fixtures('json.html'))
        .pipe(minifier())
        .pipe(through.obj((file, encoding, callback) => {
          output = file.contents.toString();
          done();
        }));
    });

    it('removes whitespace from json data', () => {
      expected.forEach((expectedScriptTagContent) =>
        expect(new RegExp(expectedScriptTagContent).test(output)).to.be.true);
    });
  });

  describe('application/ld+json', () => {
    const expected = [
      '{"type":"jsonld","parent":"head"}',
      '{"type":"jsonld","parent":"body"}',
    ];
    let output;

    beforeEach((done) => {
      gulp.src(fixtures('jsonld.html'))
        .pipe(minifier())
        .pipe(through.obj((file, encoding, callback) => {
          output = file.contents.toString();
          done();
        }));
    });

    it('removes whitespace from json data', () => {
      expected.forEach((expectedScriptTagContent) =>
        expect(new RegExp(expectedScriptTagContent).test(output)).to.be.true);
    });
  });
});
