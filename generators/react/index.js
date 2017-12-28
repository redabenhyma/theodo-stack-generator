const Generator = require('yeoman-generator');

class StackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('appName');
    this.option('clientRequired');
    this.option('serverRequired');
  }

  prompting() {
    const prompt = [
      {
        type: 'confirm',
        name: 'exampleRequired',
        message: 'Do you want a cool page example which demonstrates the best practices (Y/n) ?',
        default: true,
      },
    ];

    // When server is required, the react app is always in a 'client' dolder
    if (!this.options.serverRequired) {
      prompt.push({
        type: 'confirm',
        name: 'empty-folder',
        message: 'The current folder must be empty, even of hidden files, do you confirm (Y/n) ?',
        default: true,
      });
    }

    return this.prompt(prompt).then(answers => {
    this.answers = answers;

    const isClientDirectoryValid = !this.options.serverRequired && !this.answers['empty-folder'];

    if(isClientDirectoryValid) {
      this.env.error('The current folder must be empty to clone create-react-app');
    }});
  }

  _addReactBoilerplate() {
    this.conflicter.force = true;
    this.log('Installing create-react-app 1.4.3');
    this.spawnCommandSync('npm', ['install', '-g', 'create-react-app@1.4.3']);

    this.log('Starting create-react-app generator');
    this.spawnCommandSync('create-react-app', ['.']);

    this.log('Removing create-react-app generator boilerplate');
    [ 'package.json',
      'src/App.js',
      'src/App.css',
      'src/logo.svg',
      'src/App.test.js',
      'src/index.js'
    ].forEach(file => this.spawnCommandSync('rm', [file]))

    return Promise.resolve();
  }

  _addTemplates() {
    this.log('Copying new files for create-react-app');
    [
      { src: 'src', dest: 'src' },
      { src: 'flow-typed', dest: 'flow-typed' },
      { src: '.*', dest: '' },
    ].forEach(file => this.fs.copyTpl(
      this.templatePath(file.src),
      this.destinationPath(file.dest),
      { exampleRequired: this.answers.exampleRequired }
    ));

    if (!this.answers.exampleRequired) {
      // delete example page
      this.fs.delete('src/pages/Avatar');
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
        'flow:coverage': "flow-coverage-report --threshold=75 -i 'src/**/*.js' -t html -t json -t text",
        lint: 'eslint --ext .jsx,.js -c .eslintrc src',
        "lint:fix": "eslint --fix --ext .jsx,.js -c .eslintrc src",
        nsp: 'nsp check',
        'test:coverage': 'npm run test -- --coverage',
      },
      dependencies: {
        'react': '16.2.0',
        'react-dom': '16.2.0',
        'react-scripts': '1.0.17',
        'prop-types': '15.6.0',
        'react-intl': '2.4.0',
        'prop-types': '15.6.0',
        'react-intl': '2.3.0',
        'react-redux': '5.0.6',
        'react-router-dom': '4.2.2',
        'react-test-renderer': '16.2.0',
        'redux':'3.7.2',
        'redux-saga': '0.16.0',
        'source-map-explorer': '1.5.0',
        'whatwg-fetch': '2.0.3',
        'immutable': '3.8.2'
      },
      devDependencies: {
        'babel-eslint': '8.0.3',
        'enzyme': '3.2.0',
        'enzyme-adapter-react-16': '1.0.0',
        'eslint': '4.13.1',
        'eslint-config-airbnb': '15.1.0',
        'eslint-config-prettier': '2.3.0',
        'eslint-plugin-flowtype': '2.39.1',
        'eslint-plugin-import': '2.7.0',
        'eslint-plugin-jsx-a11y': '5.1.1',
        'eslint-plugin-mysticatea': '4.2.3',
        'eslint-plugin-prefer-object-spread': '1.2.1',
        'eslint-plugin-prettier': '2.1.2',
        'eslint-plugin-react': '7.1.0',
        'flow-bin': '0.61.0',
        'flow-coverage-report': '0.4.0',
        'flow-typed': '2.2.3',
        'nsp': '3.1.0',
        'prettier': '1.9.2',
      },
    };

    return this.fs.writeJSON(this.destinationPath('./package.json'), packageContent);
  }

  installProject() {
    if (this.options.serverRequired) {
      this.destinationRoot('client');
    }
    return this._addReactBoilerplate()
    .then(() => this._addTemplates())
    .then(() => this._updatePackageJson())
  }

  end() {
    this.spawnCommandSync('yarn');
    this.spawnCommandSync('node_modules/.bin/flow-typed', ['install']);
    this.log('Fixing possible linting issues');
    this.spawnCommandSync('yarn', ['lint:fix']);
    this.log('! Please ignore all flow warnings, everything is OK !');

    this.log('Everything went well for your React app!')
  }
};

module.exports = StackGenerator;
