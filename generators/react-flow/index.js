const Generator = require('yeoman-generator');

class ReactFlowGenerator extends Generator {
  install() {
    this.npmInstall([
        'flow-bin',
        'flow-coverage-report',
        'flow-typed',
      ],
      {'save-dev': true},
    );

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