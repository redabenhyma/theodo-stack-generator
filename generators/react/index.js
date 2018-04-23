const Generator = require('yeoman-generator');
const chalk = require('chalk');

class StackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
  }

  prompting() {
    const prompt = [
      {
        type: 'confirm',
        name: 'exampleRequired',
        message:
          'Do you want a cool page example which demonstrates the best practices?',
        default: true,
      },
    ];

    // When server is required, the react app is always in a 'client' dolder
    if (!this.options.serverRequired) {
      prompt.push({
        type: 'confirm',
        name: 'empty-folder',
        message:
          'The current folder must be empty, even of hidden files, do you confirm?',
        default: true,
      });
    }

    return this.prompt(prompt).then(answers => {
      this.answers = answers;

      const isClientDirectoryValid =
        !this.options.serverRequired && !this.answers['empty-folder'];

      if (isClientDirectoryValid) {
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
      { src: '.*', dest: '' },
      { src: '*.md', dest: '' },
    ].forEach(file =>
      this.fs.copyTpl(
        this.templatePath(file.src),
        this.destinationPath(file.dest),
        { exampleRequired: this.answers.exampleRequired },
      ),
    );
    this.log("Copying Theodo's favicon");
    this.fs.copy(
      this.templatePath('public/favicon.ico'),
      this.destinationPath('public/favicon.ico'),
    );

    if (!this.answers.exampleRequired) {
      // delete example page
      this.fs.delete('src/pages/Avatar');
      this.fs.delete('src/redux/Avatar');
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
        'flow:coverage':
          "flow-coverage-report --threshold=75 -i 'src/**/*.js' -t html -t json -t text",
        generate: 'plop --plopfile scripts/generators/index.js',
        lint: 'eslint --ext .jsx,.js -c .eslintrc src',
        'lint:fix': 'eslint --fix --ext .jsx,.js -c .eslintrc src',
        nsp: 'nsp check',
        'test:coverage': 'npm run test -- --coverage',
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
        'whatwg-fetch': '^2.0.3',
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
        'flow-bin': '^0.66.0',
        'flow-coverage-report': '^0.4.1',
        'flow-typed': '^2.3.0',
        nsp: '^3.2.1',
        prettier: '^1.10.2',
      },
    };

    return this.fs.writeJSON(
      this.destinationPath('./package.json'),
      packageContent,
    );
  }

  installProject() {
    if (this.options.serverRequired) {
      this.destinationRoot('client');
    }
    return this._addReactBoilerplate()
      .then(() => this._addTemplates())
      .then(() => this._updatePackageJson());
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
