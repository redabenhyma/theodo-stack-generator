const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactLintGenerator extends Generator {
  install() {
    this.log(chalk.black.bgGreen('Install eslint and prettier as dev dependencies.'));

    this.npmInstall([
        'babel-eslint',
        'eslint',
        'eslint-config-airbnb',
        'eslint-config-prettier',
        'eslint-plugin-flowtype',
        'eslint-plugin-import',
        'eslint-plugin-jest',
        'eslint-plugin-jsx-a11y',
        'eslint-plugin-mysticatea',
        'eslint-plugin-prefer-object-spread',
        'eslint-plugin-prettier',
        'eslint-plugin-react',
        'prettier',
      ],
      {'save-dev': true},
    );
  }

  configuring() {
    this.log(chalk.black.bgGreen('Add configuration for eslint and prettier.'));

    this.fs.copyTpl(
      this.templatePath('.prettierrc'),
      this.destinationPath('.prettierrc'),
    );

    this.fs.copyTpl(
      this.templatePath('.eslintrc'),
      this.destinationPath('.eslintrc'),
    );

    this.fs.copyTpl(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore'),
    );
  }

  writing() {
    this.log(chalk.black.bgGreen('Update package.json to add eslint and prettier commands.'));

    this.fs.extendJSON(
      'package.json',
      {
        scripts: {
          lint: 'eslint --ext .jsx,.js -c .eslintrc src',
          'lint:fix': 'eslint --fix --ext .jsx,.js -c .eslintrc src',
        }
      },
      null,
      2
    );
  }
}

module.exports = ReactLintGenerator;
