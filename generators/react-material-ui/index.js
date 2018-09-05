const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactMaterialUiGenerator extends Generator {
  install() {
    this.log(chalk.black.bgGreen('Install material-ui'));

    this.npmInstall(['@material-ui/core', '@material-ui/icons']);
  }

  configuring() {}

  writing() {}
}

module.exports = ReactMaterialUiGenerator;
