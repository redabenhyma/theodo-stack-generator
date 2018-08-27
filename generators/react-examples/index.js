const Generator = require('yeoman-generator');
const chalk = require('chalk');
const Runner = require('jscodeshift/dist/Runner');

class ReactExamplesGenerator extends Generator {
  // Todo: add pages/Avatar
  // Todo: import pages/Avatar in src/pages/index.js
  // Todo: add Avatar type in flow-typed and in app.js => store
  // Todo: add Avatar page type
  // Todo: add redux/Avatar
  // Todo: add Avatar saga in src/redux/sagas.js
  // Todo: add translations in src/translations/en.json and src/translations/fr.json

  addRoutes() {
    this.log(chalk.black.bgGreen('Add Avatar routes'));
    Runner.run(
      this._transform('add-avatar-routes'),
      [`${this._appRoot()}/src/routes.js`],
      {}
    );
  }

  addReducer() {
    this.log(chalk.black.bgGreen('Add Avatar reducers'));
    Runner.run(
      this._transform('add-avatar-reducer'),
      [`${this._appRoot()}/src/redux/reducers.js`],
      {}
    );
  }

  _transform(transform) {
    return `${this.sourceRoot()}/../transforms/${transform}.js`;
  }

  _appRoot() {
    let routingFilePath = this.destinationPath();
    if (this.options['server-required']) {
      routingFilePath += '/client'
    }
    return routingFilePath;
  }
}

module.exports = ReactExamplesGenerator;
