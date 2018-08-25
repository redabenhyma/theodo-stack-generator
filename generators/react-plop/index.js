const Generator = require('yeoman-generator');

class ReactPlopGenerator extends Generator {
  install() {
    this.npmInstall(['plop'], {'save-dev': true});

    this.fs.extendJSON(
      'package.json',
      {
        scripts: {
          generate: 'plop --plopfile scripts/generators/index.js',
        }
      },
      null,
      2
    );

    this.fs.copyTpl(
      this.templatePath('scripts'),
      this.destinationPath('scripts'),
    );
  }
}

module.exports = ReactPlopGenerator;