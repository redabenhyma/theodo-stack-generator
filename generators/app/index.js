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
        message: 'Do you need an API Platform server?',
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
        message : 'Your application name (without white space)',
        default : this.appname,
        require : true,
      },
    ])
    .then(answers => {
      this.options = answers;
    })
  }

  writeYorc() {
    this.config.set('appName', this.options.appName);
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
