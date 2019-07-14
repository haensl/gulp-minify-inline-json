const fs = require('fs');
const join = require('path').join;
const expect = require('chai').expect;
const gulp = require('gulp');
const through = require('through2');
//const File = require('vinyl');

const minifier = require('../');

const fixtures = (glob) => join(__dirname, 'fixtures', glob);

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
        .pipe(through.obj((file) => {
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
        .pipe(through.obj((file) => {
          output = file.contents.toString();
          done();
        }));
    });

    it('removes whitespace from json data', () => {
      expected.forEach((expectedScriptTagContent) =>
        expect(new RegExp(expectedScriptTagContent).test(output)).to.be.true);
    });
  });

  describe('non-JSON script', () => {
    it('throws an exception', () => {
      expect(gulp.src(fixtures('gibberish.html'))
        .pipe(minifier())
      ).to.throw;
    });
  });

  describe('no script tag', () => {
    let output;
    let input;

    beforeEach((done) => {
      input = fs.readFileSync(fixtures('noscript.html'), 'utf8');
      gulp.src(fixtures('noscript.html'))
        .pipe(minifier())
        .pipe(through.obj((file) => {
          output = file.contents.toString();
          done();
        }));
    });

    it('Bypasses the input', () => {
      expect(output).to.equal(input);
    });
  });

  describe('no input', () => {
    it('does not throw', () => {
      expect(minifier).not.to.throw;
    });
  });

  describe('options', () => {
    let output;

    describe('mimeTypes', () => {
      describe('application/json', () => {
        beforeEach((done) => {
          gulp.src(fixtures('json+jsonld.html'))
            .pipe(minifier({
              mimeTypes: [
                'application/json'
              ]
            })).pipe(through.obj((file) => {
              output = file.contents.toString();
              done();
            }));
        });

        it('minifies application/json', () => {
          expect(/{"type":"json","parent":"head"}/.test(output)).to.be.true;
        });

        it('does not minify application/ld+json', () => {
          expect(/{"type":"jsonld","parent":"body"}/.test(output)).to.be.false;
        });
      });

      describe('application/ld+json', () => {
        beforeEach((done) => {
          gulp.src(fixtures('json+jsonld.html'))
            .pipe(minifier({
              mimeTypes: [
                'application/ld+json'
              ]
            })).pipe(through.obj((file) => {
              output = file.contents.toString();
              done();
            }));
        });

        it('minifies application/json', () => {
          expect(/{"type":"json","parent":"head"}/.test(output)).to.be.false;
        });

        it('does not minify application/ld+json', () => {
          expect(/{"type":"jsonld","parent":"body"}/.test(output)).to.be.true;
        });
      });
    });
  });
});
