const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactFlowGenerator extends Generator {
  install() {
    this.log(chalk.black.bgGreen('Install flow as dev dependecies.'));

    this.yarnInstall(['flow-bin', 'flow-coverage-report', 'flow-typed'], {
      dev: true,
    });
  }

  writing() {
    this.log(chalk.black.bgGreen('Update package.json to add flow commands.'));

    this.fs.extendJSON(
      'package.json',
      {
        scripts: {
          flow: 'flow',
          'flow:coverage': 'flow-coverage-report --config=.flowcoverageconfig',
        },
      },
      null,
      2,
    );

    [
      { src: 'flow-typed', dest: 'flow-typed' },
      { src: '.*', dest: '' },
    ].forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
      ),
    );
  }
}

module.exports = ReactFlowGenerator;
