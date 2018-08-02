const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactCIGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', {type: String, required: true});
    }

    install() {
        this.log('Copying circleci config');
        this.fs.copyTpl(
            this.templatePath('config.yml'),
            this.destinationPath('.circleci/config.yml'),
            { appname: this.options.appname },
        );
    }
}

module.exports = ReactCIGenerator;
