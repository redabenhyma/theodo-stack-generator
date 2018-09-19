const Generator = require("yeoman-generator");
const chalk = require("chalk");
const Runner = require("jscodeshift/dist/Runner");

class ReactAuthGenerator extends Generator {
  _addTemplates() {
    this.log(chalk.black.bgGreen("Copying new files for Login"));
    [
      { src: "LoginPage", dest: "src/pages/Login" },
      { src: "LoginRedux", dest: "src/redux/Login" },
      { src: "login.js", dest: "src/services/networking/login.js" }
    ].forEach(file => this.fs.copyTpl(this.templatePath(file.src), this.destinationPath(file.dest)));
  }

  _addRoutes() {
    this.log(chalk.black.bgGreen("Add Auth routes"));
    Runner.run(this._transform("add-auth-routes"), [`${this._appRoot()}/src/routes.js`], {});
  }

  _transform(transform) {
    return `${this.sourceRoot()}/../transforms/${transform}.js`;
  }

  _appRoot() {
    let routingFilePath = this.destinationPath();
    if (this.options["server-required"]) {
      routingFilePath += "/client";
    }
    return routingFilePath;
  }

  install() {
    this.log(chalk.black.bgGreen("Install Formik to handle login form"));
    this.npmInstall(["formik"]);
    this._addTemplates();
    this._addRoutes();
  }
}

module.exports = ReactAuthGenerator;
