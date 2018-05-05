const Generator = require("yeoman-generator");
const chalk = require("chalk");

class StackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('appname', { type: String, required: true });

    this.option(
      'serverRequired',
      {
        description: 'Add a Symfony app',
        type: Boolean
      },
    );

    this.option(
      'clientRequired',
      {
        description: 'Add a React/Redux app',
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
        name: 'serverRequired',
        message: 'Do you need an API Platform server?',
        default: true,
        when: (answers) => {
          return this.options.serverRequired === undefined;
        }
      },
      {
        type: 'confirm',
        name: 'clientRequired',
        message: 'Do you need react redux client?',
        default: true,
        when: (answers) => {
          return this.options.clientRequired === undefined;
        }
      },
    ])
    .then(answers => {
      this.options.serverRequired = answers.serverRequired || this.options.serverRequired;
      this.options.clientRequired = answers.clientRequired || this.options.clientRequired;
    })
  }

  writeYorc() {
    this.config.set('appName', this.options.appname);
    this.config.set('clientRequired', this.options.clientRequired);
    this.config.set('serverRequired', this.options.serverRequired);
    if (
      this.options.clientRequired &&
      ['react', 'react-scripts', 'react-dom'].indexOf(this.appname) >= 0
    ) {
      this.env.error('The react app cannot be created in a folder called react, react-scripts or react-dom');
    }
    this.config.save();
  }

  installServer() {
    if (!this.options.serverRequired) {
      return;
    }
    const server = require.resolve('../server');
    this.composeWith(server, this.options);
  }

  installClient() {
    if (!this.options.clientRequired) {
      return;
    }

    const client = require.resolve('../react');
    this.composeWith(client, this.options);
  }
};

module.exports = StackGenerator;
