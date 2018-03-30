const Generator = require('yeoman-generator');

class StackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.option('appName');
    this.option('clientRequired');
    this.option('serverRequired');
  }

  prompting() {
    this.answers = { appName: this.options.appName };
    this.answers.clientPublicDirectory = 'client/build';

    const serverQuestions = [
      {
        type    : 'input',
        name    : 'stagingDatabasePassword',
        message : '[Provisioning] Staging database password',
        default : this.appname,
      },
      {
        type    : 'input',
        name    : 'prodDatabasePassword',
        message : '[Provisioning] Production database password',
        default : this.appname,
      },
      {
        type    : 'input',
        name    : 'repositoryUrl',
        message : '[Deployment] Your git repository URL',
        default : '',
      },
      {
        type    : 'input',
        name    : 'stagingIpAddress',
        message : '[Provisioning/Deployment] Staging IP address',
        default : '',
      },
      {
        type    : 'input',
        name    : 'prodIpAddress',
        message : '[Provisioning/Deployment](Optionnal) Your production IP address',
        default : '',
      }
    ];

    this.answers.virtualEnv = 'vagrant';

    return this.prompt(serverQuestions)
    .then(serverAnswers => {
      this.answers = Object.assign(this.answers, serverAnswers);
      this.answers.databaseHost = 'localhost';
    })
  }

  _addDocumentation () {
    let files = [
      'README.md',
      'doc/provisioning.md',
      'doc/installation-symfony.md',
      'doc/deployment-symfony.md',
      'doc/database-symfony.md',
      'doc/tests-symfony.md',
    ];

    return Promise.all(files.map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file.replace(/-symfony|-react-redux|-no-client|-vagrant/, '')),
       this.answers
     );
   }));
  }

  _addConfigurationTemplates () {
    const files = [
      'gitignore',
      '.editorconfig',
      'ansible.cfg',
      'Vagrantfile',
    ];

    return Promise.all(files.map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file.replace(/-symfony/, '')),
       this.answers
     );
   }));
  }

  _addProvisioningTemplates () {
    return this._addSymfonyDevopsTemplates();
  }

  _addSymfonyDevopsTemplates () {
    this.fs.copy(
      this.templatePath('devops-symfony/provisioning/roles'),
      this.destinationPath('devops/provisioning/roles'),
      this.answers
    );

    return Promise.all([
      'Gemfile',
      'Gemfile.lock',
      'Capfile',
      'devops-symfony/deploy/stages/prod.rb',
      'devops-symfony/deploy/stages/staging.rb',
      'devops-symfony/deploy/deploy.rb',
      'devops-symfony/deploy/tasks/yarn.cap',
      'devops-symfony/provisioning/group_vars/prod',
      'devops-symfony/provisioning/group_vars/staging',
      'devops-symfony/provisioning/group_vars/vagrant',
      'devops-symfony/provisioning/hosts/prod',
      'devops-symfony/provisioning/hosts/staging',
      'devops-symfony/provisioning/hosts/vagrant',
      'devops-symfony/provisioning/vars/main.yml',
      'devops-symfony/provisioning/vars/ubuntu-xdebug.yml',
      'devops-symfony/provisioning/playbook.yml',
   ].map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file.replace(/-symfony/, '')),
       this.answers
     );
   }));
  }

  _addComposer () {
    this.spawnCommandSync('php', ['-r', "copy('https://getcomposer.org/installer', 'composer-setup.php');"]);
    this.spawnCommandSync('php', ['-r', "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"]);
    this.spawnCommandSync('php', ['composer-setup.php']);
    this.spawnCommandSync('php', ['-r', "unlink('composer-setup.php');"]);
    return Promise.resolve();
  }

  installProject() {
    return this._addComposer()
    .then(() => this._addConfigurationTemplates())
    .then(() => this._addDocumentation())
    .then(() => this._addProvisioningTemplates())
  }

  end() {
    // .gitgnore is not included by npm publish https://github.com/npm/npm/issues/3763
    // It can be bypassed by renaming a gitignore file to .gitignore
    this.spawnCommandSync('mv', ['./gitignore', './.gitignore']);
  }
};

module.exports = StackGenerator;
