const Generator = require('yeoman-generator');
const _ = require('lodash');

class StackGenerator extends Generator {
  addReactBoilerplate() {
    this.log('Installing create-react-app 1.4.3');
    this.spawnCommandSync('npm', ['install', '-g', 'create-react-app@1.4.3']);

    this.log('Starting create-react-app generator');
    this.spawnCommandSync('create-react-app', ['.']);

    this.log('Removing create-react-app generator boilerplate');
    return [
      'src/App.js',
      'src/App.css',
      'src/logo.svg',
      'src/App.test.js',
      'src/index.js'
    ].forEach(file => this.spawnCommandSync('rm', [file]))
  }

  addTemplates() {
    this.log('Copying new files for create-react-app');
    return [
      { src: 'src', dest: 'src' },
      { src: 'flow-typed', dest: 'flow-typed' },
      { src: '.*', dest: '' },
    ].forEach(file => this.fs.copy(
      this.templatePath(file.src),
      this.destinationPath(file.dest),
    ))
  }

  updatePackageJson() {
    let existingPackage = {};
    let content = {
      scripts: {
        analyze: 'source-map-explorer build/static/js/main.*',
        flow: 'flow',
        'flow:coverage': "flow-coverage-report --threshold=75 -i 'src/**/*.js' -t html -t json -t text",
        lint: 'eslint --ext .jsx,.js -c .eslintrc src',
        nsp: 'nsp check',
        'test:coverage': 'npm run test -- --coverage',
      },
      dependencies: {
        'prop-types': '15.6.0',
        'react-intl': '2.3.0',
        'react-redux': '5.0.6',
        'react-router-dom': '4.2.2',
        'react-test-renderer': '16.0.0',
        'redux':'3.7.2',
        'redux-saga': '0.15.6',
        'source-map-explorer': '1.4.0',
        'whatwg-fetch': '2.0.3',
        'immutable': '3.8.2'
      },
      devDependencies: {
        'babel-eslint': '7.2.3',
        'enzyme': '3.0.0',
        'enzyme-adapter-react-16': '1.0.0',
        'eslint': '4.3.0',
        'eslint-config-airbnb': '15.1.0',
        'eslint-config-prettier': '2.3.0',
        'eslint-plugin-flowtype': '2.39.1',
        'eslint-plugin-import': '2.7.0',
        'eslint-plugin-jsx-a11y': '5.1.1',
        'eslint-plugin-mysticatea': '4.2.3',
        'eslint-plugin-prefer-object-spread': '1.2.1',
        'eslint-plugin-prettier': '2.1.2',
        'eslint-plugin-react': '7.1.0',
        'flow-bin': '0.57.1',
        'flow-coverage-report': '0.3.0',
        'flow-typed': '2.2.0',
        'nsp': '2.7.0',
        'prettier': '1.7.0',
      },
    };
    try {
      existingPackage = this.fs.readJSON('package.json');
      content = _.merge(content, existingPackage);
    } catch (e) {
      this.log('failed reading package.json')
    }
    console.log('existingPackage', existingPackage);
    this.log('Updating package.json');
    this.fs.delete('package.json');
    console.log('content', content);
    return this.fs.writeJSON(this.destinationPath('./package.json'), content);
  }

  end() {
    this.spawnCommandSync('yarn');
    this.spawnCommandSync('node_modules/.bin/flow-typed', ['install']);
    this.log('!!!!!! Please ignore all flow warnings, everything is OK !!!!!!');

    this.log('Everything went well, enjoy your new app!')
  }
};

module.exports = StackGenerator;
