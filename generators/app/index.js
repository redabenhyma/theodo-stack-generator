const Generator = require('yeoman-generator');

class StackGenerator extends Generator {
  installClient(){
    const client = require.resolve('../react');

    this.composeWith(client);
  }

  installServer(){
    const server = require.resolve('../server');
    this.composeWith(server)
  }
};

module.exports = StackGenerator;
