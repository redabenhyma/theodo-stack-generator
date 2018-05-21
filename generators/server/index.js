const Generator = require('yeoman-generator');

class StackGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.option(
      'staging-database-password',
      {
        description: 'Database password for staging environment',
        type: String
      }
    );
    this.option(
      'prod-database-password',
      {
        description: 'Database password for production environment',
        type: String,
      }
    );
    this.option(
      'repository-url',
      {
        description: 'GIT repository URL',
        type: String,
      }
    );
    this.option(
      'staging-ip-address',
      {
        description: 'IP address for production environment',
        type: String,
      }
    );
    this.option(
      'prod-ip-address',
      {
        description: 'IP address for production environment',
        type: String,
      }
    );
  }

  prompting() {
    this.answers = { appName: this.options.appName };
    this.answers.clientPublicDirectory = 'client/build';

    const serverQuestions = [
      {
        type    : 'input',
        name    : 'staging-database-password',
        message : '[Provisioning] Staging database password',
        default : this.appname,
        when: (answers) => {
          return this.options['staging-database-password'] == undefined;
        }
      },
      {
        type    : 'input',
        name    : 'prod-database-password',
        message : '[Provisioning] Production database password',
        default : this.appname,
        when: (answers) => {
          return this.options['prod-database-password'] == undefined;
        }
      },
      {
        type    : 'input',
        name    : 'repository-url',
        message : '[Deployment] Your git repository URL',
        default : '',
        when: (answers) => {
          return this.options['repository-url'] == undefined;
        }
      },
      {
        type    : 'input',
        name    : 'staging-ip-address',
        message : '[Provisioning/Deployment] Staging IP address',
        default : '',
        when: (answers) => {
          return this.options['staging-ip-address'] == undefined;
        }
      },
      {
        type    : 'input',
        name    : 'prod-ip-address',
        message : '[Provisioning/Deployment](Optionnal) Your production IP address',
        default : '',
        when: (answers) => {
          return this.options['prod-ip-address'] == undefined;
        }
      }
    ];

    this.answers.virtualEnv = 'vagrant';

    return this.prompt(serverQuestions)
    .then(serverAnswers => {
      this.provisioningVars = {
        appName: this.appName,
        repositoryUrl: serverAnswers['repository-url'] || this.options['repository-url'],
        databaseHost: 'localhost',
        stagingIpAddress: serverAnswers['staging-ip-address'] || this.options['staging-ip-address'],
        prodIpAddress: serverAnswers['prod-ip-address'] || this.options['prod-ip-address'],
        prodDatabasePassword: serverAnswers['prod-database-password'] || this.options['prod-database-password'],
        stagingDatabasePassword: serverAnswers['staging-database-password'] || this.options['staging-database-password']
      };
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
       this.provisioningVars
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
       this.provisioningVars
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
      this.provisioningVars
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
       this.provisioningVars
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
