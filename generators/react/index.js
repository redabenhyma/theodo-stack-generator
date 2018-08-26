const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option('empty-folder', {
      description: 'Empty the client folder',
      type: Boolean,
    });
  }

  prompting() {
    const prompt = [
      // When server is required, the react app is always in a 'client' folder
      {
        type: 'confirm',
        name: 'empty-folder',
        message:
          'The current folder must be empty, even of hidden files, do you confirm?',
        default: true,
        when: answers => {
          return (
            !this.options['server-required'] &&
            this.options['empty-folder'] == undefined
          );
        },
      },
    ];

    return this.prompt(prompt).then(answers => {
      this.answers = Object.assign({}, answers, this.options);

      if (
        this.options['server-required'] === false &&
        this.answers['empty-folder'] === false
      ) {
        this.env.error(
          'The current folder must be empty to clone create-react-app',
        );
      }
    });
  }

  _updatePackageJSon() {
    const packageJson = {
      scripts: {
        analyze: 'source-map-explorer build/static/js/main.*',
        generate: 'plop --plopfile scripts/generators/index.js',
        lint: 'eslint --ext .jsx,.js -c .eslintrc src',
        'lint:fix': 'eslint --fix --ext .jsx,.js -c .eslintrc src',
        nsp: 'nsp check',
        'test:coverage': 'npm run test -- --coverage',
      }
    };

    this.fs.extendJSON('package.json', packageJson, null, 2);
  }

  _addPackages() {
    this.npmInstall([
      'plop',
      'react-intl',
      'react-redux',
      'react-router-dom',
      'react-test-renderer',
      'redux',
      'redux-saga',
      'source-map-explorer',
      'styled-components',
      'whatwg-fetch',
    ]);
  }

  _addDevPackages() {
    this.npmInstall([
        'babel-eslint',
        'enzyme',
        'enzyme-adapter-react-16',
        'enzyme-to-json',
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
        'nsp',
        'prettier',
      ],
      {'save-dev': true},
    );
  }

  _addTemplates() {
    this.log('Copying new files for create-react-app');
    [
      { src: 'src', dest: 'src' },
      { src: 'flow-typed', dest: 'flow-typed' },
      { src: 'scripts', dest: 'scripts' },
      { src: 'public/*', dest: 'public' },
      { src: '.*', dest: '' },
      { src: '*.md', dest: '' },
    ].forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
      ),
    );

    return Promise.resolve();
  }

  _addReactBoilerplate() {
    this.conflicter.force = true;
    this.log('Installing create-react-app 1.5.1');
    this.spawnCommandSync('npm', ['install', '-g', 'create-react-app@1.4.3']);

    this.log('Starting create-react-app generator');
    this.spawnCommandSync('create-react-app', ['.']);

    this.log('Removing create-react-app generator boilerplate');
    [
      'package.json',
      'src/App.js',
      'README.md',
      'src/App.css',
      'src/logo.svg',
      'src/App.test.js',
      'public/favicon.ico',
      'public/index.html',
      'public/reset.css',
      'src/index.js',
    ].forEach(file => this.spawnCommandSync('rm', [file]));

    return Promise.resolve();
  }

  _addCircleCiConfig() {
    if (!this.options['server-required']) {
      const client = require.resolve('../react-ci');
      this.composeWith(client, { ...this.options, arguments: [this.options.appname] });

      return Promise.resolve();
    }
  }

  _addFlow() {
    const client = require.resolve('../react-flow');
    this.composeWith(client, { ...this.options, arguments: [this.options.appname] });
  }

  install() {
    if (this.options['server-required']) {
      this.destinationRoot('client');
    }

    this._addReactBoilerplate();
    this._addPackages();
    this._addDevPackages();
    this._updatePackageJSon();
    this._addFlow();
    this._addTemplates();
    this._addCircleCiConfig();
  }

  end() {
    this.spawnCommandSync('yarn');
    this.spawnCommandSync('node_modules/.bin/flow-typed', ['install']);
    this.spawnCommandSync('node_modules/.bin/flow-typed', [
      'install',
      'jest@20.0.4',
    ]);
    this.log('Fixing possible linting issues');
    this.spawnCommandSync('yarn', ['lint:fix']);

    this.log(
      chalk.black.bgGreen(
        '! Please ignore all flow warnings, everything is OK !',
      ),
    );
    this.log(chalk.black.bgGreen('Everything went well for your React app!'));
  }
}

module.exports = ReactGenerator;