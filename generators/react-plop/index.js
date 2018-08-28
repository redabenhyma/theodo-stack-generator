const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactPlopGenerator extends Generator {
  install() {
    this.log(chalk.black.bgGreen('Install plop as dev dependencies.'));

    this.npmInstall(['plop'], {'save-dev': true});
  }

  writing() {
    this.log(chalk.black.bgGreen('Update package.json to add plop commands.'));

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