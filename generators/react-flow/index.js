const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactFlowGenerator extends Generator {
  install() {
    this.log(chalk.black.bgGreen('Install flow as dev dependecies.'));

    this.npmInstall([
        'flow-bin',
        'flow-coverage-report',
        'flow-typed',
      ],
      {'save-dev': true},
    );
  }

  writing() {
    this.log(chalk.black.bgGreen('Update package.json to add flow commands.'));

    this.fs.extendJSON(
      'package.json',
      {
        scripts: {
          flow: 'flow',
          'flow:coverage': "flow-coverage-report --config=.flowcoverageconfig",
        }
      },
      null,
      2
    );

    this.fs.copyTpl(
      this.templatePath('flow-typed'),
      this.destinationPath('flow-typed'),
    );
  }
}

module.exports = ReactFlowGenerator;
