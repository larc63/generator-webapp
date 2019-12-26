const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('Google Closure Compiler feature', () => {
  describe('on', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({
          features: [],
          transpiler: 'Google Closure Compiler'
        })
        .on('end', done);
    });

    it('should not add dependencies in package.json', () => {
      assert.noFileContent('package.json', 'babel/core');
      assert.noFileContent('package.json', 'babel/preset-env');
      assert.noFileContent('package.json', 'gulp-babel');
    });

    it('should add closure compiler dependencies in package.json', () => {
      assert.fileContent('package.json', 'google-closure-compiler');
    });

    it('should add the right dependencies in gulpfile.js', () => {
      assert.noFileContent('gulpfile.js', '.pipe($.babel())');
      assert.fileContent('gulpfile.js', '.pipe(closureCompiler');
    });
  });

  describe('babel', () => {
    before(done => {
      helpers
        .run(path.join(__dirname, '../app'))
        .withPrompts({
          features: [],
          transpiler: 'Babel'
        })
        .on('end', done);
    });

    it('should add dependencies in package.json', () => {
      assert.fileContent('package.json', 'babel/core');
      assert.fileContent('package.json', 'babel/preset-env');
      assert.fileContent('package.json', 'gulp-babel');
    });

    it("shouldn't add closure compiler dependencies in package.json", () => {
      assert.noFileContent('package.json', 'google-closure-compiler');
    });

    it('should add the right dependencies in gulpfile.js', () => {
      assert.fileContent('gulpfile.js', '.pipe($.babel())');
      assert.noFileContent('gulpfile.js', '.pipe(closureCompiler');
    });
  });
});
