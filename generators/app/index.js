const Generator = require("yeoman-generator");
const chalk = require("chalk");

class StackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', { type: String, required: true });

    this.option(
      'server-required',
      {
        description: 'Add a Symfony app',
        alias: 'server',
        type: Boolean
      },
    );

    this.option(
      'client-required',
      {
        description: 'Add a React/Redux app',
        alias: 'client',
        type: Boolean
      }
    );
  }

  prompting() {
    if (this.options.appname.toLowerCase() != this.options.appname) {
      this.log(
        chalk.red(
          "The react app cannot be created in a folder with a name containing capital letters"
        )
      );
      this.env.error("Please rename your client folder to a lowercase name");
    }

    return this.prompt([
      {
        type: 'confirm',
        name: 'server-required',
        message: 'Do you need an API Platform server?',
        default: true,
        when: (answers) => {
          return this.options['server-required'] === undefined;
        }
      },
      {
        type: 'confirm',
        name: 'client-required',
        message: 'Do you need react redux client?',
        default: true,
        when: (answers) => {
          return this.options['client-required'] === undefined;
        }
      },
    ])
    .then(answers => {
      this.options['server-required'] = answers['server-required'] || this.options['server-required'];
      this.options['client-required'] = answers['client-required'] || this.options['client-required'];
    })
  }

  writeYorc() {
    this.config.set('appName', this.options.appname);
    this.config.set('client-required', this.options['client-required']);
    this.config.set('server-required', this.options['server-required']);
    if (
      this.options['client-required'] &&
      ['react', 'react-scripts', 'react-dom'].indexOf(this.appname) >= 0
    ) {
      this.env.error('The react app cannot be created in a folder called react, react-scripts or react-dom');
    }
    this.config.save();
  }

  installServer() {
    if (!this.options['server-required']) {
      return;
    }
    const server = require.resolve('../server');
    this.composeWith(server, this.options);
  }

  installClient() {
    if (!this.options['client-required']) {
      return;
    }

    const client = require.resolve('../react');
    this.composeWith(client, this.options);
  }
};

module.exports = StackGenerator;
