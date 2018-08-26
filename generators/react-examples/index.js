const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactExamplesGenerator extends Generator {
  // Todo: add pages/Avatar
  // Todo: import pages/Avatar in src/pages/index.js
  // Todo: add Avatar type in flow-typed and in app.js => store
  // Todo: add Avatar page type
  // Todo: add redux/Avatar
  // Todo: add Avatar reducer in src/redux/reducers.js
  // Todo: add Avatar saga in src/redux/sagas.js
  // Todo: add translations in src/translations/en.json and src/translations/fr.json

  addRoutes() {
    this.log(chalk.black.bgGreen('Add Avatar routes'));

    /**
     * Todo: Would be best to use jscodeshift programmatically instead but it is not possible yet...
     */
    this.spawnCommandSync(
      'npx',
      [
        'jscodeshift',
        this._routingFile(),
        '-t',
        this._transformsDir('add-avatar-routes'),
      ]
    );
  }

  _transformsDir(transform) {
    return `${this.sourceRoot()}/../transforms/${transform}.js`;
  }

  _routingFile() {
    let routingFilePath = this.destinationPath();
    if (this.options['server-required']) {
      routingFilePath += '/client'
    }

    return `${routingFilePath}/src/routes.js`;
  }
}

module.exports = ReactExamplesGenerator;
