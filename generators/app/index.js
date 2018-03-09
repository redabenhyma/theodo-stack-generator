const Generator = require("yeoman-generator");
const chalk = require("chalk");

class StackGenerator extends Generator {
  prompting() {
    if (this.appname.toLowerCase() != this.appname) {
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
        message: 'Do you need a backend (API Platform / Django server)?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'clientRequired',
        message: 'Do you need react redux client?',
        default: true,
      },
      {
        type    : 'input',
        name    : 'appName',
        message : 'Your application name',
        default : this.appname,
        require : true,
      },
    ])
    .then(answers => {
      this.options = answers;
      if (this.options.clientRequired) {
        this.prompt([
          {
            type: 'list',
            name: 'backend',
            message: 'Which backend would suit you?',
            default: 'API Platform (Symfony)',
            choices : ['API Platform (Symfony)', 'Django (Python)']
          },
        ])
        .then(backendAnswer => {
          this.options.backend = backendAnswer.backend;
        })
      }
    })
  }

  writeYorc() {
    this.config.set('appName', this.options.appName);
    this.config.set('clientRequired', this.options.clientRequired);
    this.config.set('serverRequired', this.options.serverRequired);
    this.config.set('backend', this.options.backend);
    if (
      this.options.clientRequired &&
      ['react', 'react-scripts', 'react-dom'].indexOf(this.appname) >= 0
    ) {
      this.env.error('The react app cannot be created in a folder called react, react-scripts or react-dom');
    }
    if (
      this.backend === 'Django (Python)' &&
      RegExp('-|_|\\s', 'g').test(this.appname)
    ) {
      this.env.error('Your django app folder name cannot contain an hyphen, lodash or whitespace');
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
