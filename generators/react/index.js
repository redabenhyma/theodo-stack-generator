const Generator = require('yeoman-generator');
const chalk = require('chalk');

class StackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option(
      'add-example',
      {
        description: 'Add a cool page example which demonstrates the best practices?',
        type: Boolean
      },
    );

    this.option(
      'empty-folder',
      {
        description: 'Empty the client folder',
        type: Boolean
      }
    );
  }

  prompting() {
    const prompt = [
      {
        type: 'confirm',
        name: 'add-example',
        message:
          'Do you want a cool page example which demonstrates the best practices?',
        default: true,
        when: (answers) => {
          return this.options['add-example'] === undefined;
        }
      },
      // When server is required, the react app is always in a 'client' folder
      {
        type: 'confirm',
        name: 'empty-folder',
        message:
          'The current folder must be empty, even of hidden files, do you confirm?',
        default: true,
        when: (answers) => {
          return !this.options['server-required'] && this.options['empty-folder'] == undefined;
        }
      }
    ];

    return this.prompt(prompt).then(answers => {
      this.answers = Object.assign({}, answers, this.options);

      if (this.options['server-required'] === false && this.answers['empty-folder'] === false) {
        this.env.error(
          'The current folder must be empty to clone create-react-app',
        );
      }
    });
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
        { 'exampleRequired': this.answers['add-example'] },
      ),
    );

    if (!this.answers['add-example']) {
      // delete example page
      this.fs.delete('src/pages/Avatar');
      this.fs.delete('src/redux/Avatar');
    }

    return Promise.resolve();
  }

  _addCircleCiConfig() {
    if (!this.options['server-required']) {
      this.log('Copying circleci config');
      [{ src: '.circleci', dest: '.circleci' }].forEach(file =>
        this.fs.copyTpl(
          this.templatePath(file.src),
          this.destinationPath(file.dest),
          { appName: this.options.appName },
        ),
      );
    }

    return Promise.resolve();
  }

  _updatePackageJson() {
    const packageContent = {
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test --env=jsdom',
        eject: 'react-scripts eject',
        analyze: 'source-map-explorer build/static/js/main.*',
        flow: 'flow',
        'flow:coverage': 'flow-coverage-report --config=.flowcoverageconfig',
        generate: 'plop --plopfile scripts/generators/index.js',
        lint: 'eslint --ext .jsx,.js -c .eslintrc src',
        'lint:fix': 'eslint --fix --ext .jsx,.js -c .eslintrc src',
        nsp: 'nsp check',
        'test:coverage': 'npm run test -- --coverage',
        precommit: 'lint-staged',
      },
      jest: {
        collectCoverageFrom: [
          'src/**/*.js',
          '!src/**/*.test.js',
          '!src/**/index.js',
          '!src/**/registerServiceWorker.js',
          '!src/**/*.container.js',
          '!src/index.js',
          '!src/tempPolyfills.js',
          '!src/setupTests.js',
          '!src/redux/reducers.js',
          '!src/redux/sagas.js',
          '!src/redux/store.js',
        ],
        coverageThreshold: {
          global: {
            statements: 100,
            branches: 100,
            functions: 100,
            lines: 100,
          },
        },
      },
      dependencies: {
        plop: '^1.9.1',
        react: '^16.2.0',
        'react-dom': '^16.2.0',
        'react-intl': '^2.4.0',
        'react-redux': '^5.0.7',
        'react-router-dom': '^4.2.2',
        'react-scripts': '^1.1.1',
        'react-test-renderer': '^16.2.0',
        redux: '^3.7.2',
        'redux-saga': '^0.16.0',
        'source-map-explorer': '^1.5.0',
        'styled-components': '3.1.6',
        superagent: '^3.8.3',
      },
      devDependencies: {
        'babel-eslint': '^8.2.1',
        enzyme: '^3.3.0',
        'enzyme-adapter-react-16': '^1.1.1',
        'enzyme-to-json': '^3.3.0',
        eslint: '^4.18.0',
        'eslint-config-airbnb': '^16.1.0',
        'eslint-config-prettier': '^2.9.0',
        'eslint-plugin-flowtype': '^2.44.0',
        'eslint-plugin-import': '^2.8.0',
        'eslint-plugin-jest': '^21.12.1',
        'eslint-plugin-jsx-a11y': '^6.0.3',
        'eslint-plugin-mysticatea': '^4.2.4',
        'eslint-plugin-prefer-object-spread': '^1.2.1',
        'eslint-plugin-prettier': '^2.6.0',
        'eslint-plugin-react': '^7.6.1',
        'flow-bin': '^0.68.0',
        'flow-coverage-report': '^0.4.1',
        'flow-typed': '^2.3.0',
        husky: '^0.14.3',
        'lint-staged': '^7.1.2',
        nsp: '^3.2.1',
        prettier: '^1.10.2',
      },
      'lint-staged': {
        'src/**/*.{js,jsx}': 'eslint -c .eslintrc',
      },
    };

    return this.fs.writeJSON(
      this.destinationPath('./package.json'),
      packageContent,
    );
  }

  installProject() {
    if (this.options['server-required']) {
      this.destinationRoot('client');
    }

    return this._addReactBoilerplate()
      .then(() => this._addTemplates())
      .then(() => this._updatePackageJson())
      .then(() => this._addCircleCiConfig());
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

module.exports = StackGenerator;
