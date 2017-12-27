const Generator = require('yeoman-generator');

class StackGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type    : 'list',
        name    : 'backend',
        message : 'Do you want a server?',
        default : 'No backend',
        choices : ['No backend', 'API Platform (Symfony)']
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
      this.answers = answers;
      this.answers.clientPublicDirectory = 'client/build';

      if (this.answers.backend === 'No backend') {
        this.log("Maybe next time for the server!")
        return Promise.resolve();
      }

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

      return this.prompt(serverQuestions);
    })
    .then(serverAnswers => {
      this.answers = Object.assign(this.answers, serverAnswers);
      if (this.answers.virtualEnv === 'docker') {
        // docker database host is postgresql
        this.answers.databaseHost = 'postgresql';
      } else {
        // vagrant database host is localhost
        this.answers.databaseHost = 'localhost';
      }
    })
  }

  _addDocumentation () {
    let files = [
      'README.md',
    ];

    if (this.answers.backend !== 'No backend') {
      files = files.concat([
        'doc/provisioning.md',
      ]);
    }

    if (this.answers.backend === 'API Platform (Symfony)') {
      files = files.concat([
        'doc/installation-symfony.md',
        'doc/deployment-symfony.md',
        'doc/database-symfony.md',
        'doc/tests-symfony.md',
      ]);
    }

    return Promise.all(files.map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file.replace(/-symfony|-react-redux|-no-client|-vagrant|-docker/, '')),
       this.answers
     );
   }));
  }

  _addConfigurationTemplates () {
    let files = [
      'gitignore',
      '.yo-rc.json',
      '.editorconfig',
      '.eslintignore',
      'ansible.cfg',
    ];

    if (this.answers.virtualEnv === 'vagrant') {
      files = files.concat([
        'Vagrantfile',
      ])
    }

    return Promise.all(files.map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file.replace(/-symfony/, '')),
       this.answers
     );
   }));
  }

  _addProvisioningTemplates () {
    if (this.answers.backend === 'API Platform (Symfony)') {
      return this._addSymfonyDevopsTemplates();
    }
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

  _addSymfonyServer () {
    this.spawnCommandSync('git', ['clone', 'https://github.com/api-platform/demo', './']);
    this.spawnCommandSync('rm', ['./README.md']);
    this.spawnCommandSync('rm', ['./CONTRIBUTING.md']);
    this.spawnCommandSync('rm', ['./Dockerfile']);
    this.spawnCommandSync('rm', ['./docker-compose.yml']);
    this.spawnCommandSync('rm', ['-rf', '.git']);
    this.spawnCommandSync('php', ['-r', "copy('https://getcomposer.org/installer', 'composer-setup.php');"]);
    this.spawnCommandSync('php', ['-r', "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"]);
    this.spawnCommandSync('php', ['composer-setup.php']);
    this.spawnCommandSync('php', ['-r', "unlink('composer-setup.php');"]);
    return Promise.resolve();
  }

  installProject() {
    if (this.answers.backend !== 'API Platform (Symfony)') {
      return;
    }

    return this._addConfigurationTemplates()
    .then(() => this._addDocumentation())
    .then(() => this._addProvisioningTemplates())
  }

  end() {
    // .gitgnore is not included by npm publish https://github.com/npm/npm/issues/3763
    // It can be bypassed by renaming a gitgnore file to .gitignore
    this.spawnCommandSync('mv', ['./gitignore', './.gitignore']);

    this.log('Everything went well, enjoy your new app!')
  }
};

module.exports = StackGenerator;
