const Generator = require('yeoman-generator');
const chalk = require('chalk');

class ReactCIGenerator extends Generator {
    constructor(args, opts) {
        super(args, opts);

        this.argument('appname', {type: String, required: true});
    }

    install() {
        if (!this.options['server-required']) {
            this.log('Copying circleci config');
            this.fs.copyTpl(
                this.templatePath('config.yml'),
                this.destinationPath('.circleci/config.yml'),
                { appName: this.options.appName },
            );
        }

        return Promise.resolve();
    }
}

module.exports = ReactCIGenerator;
