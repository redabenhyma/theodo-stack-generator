const Generator = require('yeoman-generator');
const _ = require('lodash');

class StackGenerator extends Generator {
  prompting() {
    return this.prompt([
      {
        type    : 'input',
        name    : 'appName',
        message : 'Your application name',
        default : this.appname,
        require : true,
      },
      {
        type    : 'list',
        name    : 'backend',
        message : 'Choose your backend',
        default : 'API Platform (Symfony)',
        choices : ['API Platform (Symfony)', 'Loopback (nodejs)']
      },
    ])
    .then(answers => {
      this.answers = answers;
      this.answers.clientPublicDirectory = 'client/build';

      if (this.answers.backend === 'No backend') {
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

      if (this.answers.backend === 'Loopback (nodejs)') {
        serverQuestions.unshift({
          type    : 'list',
          name    : 'virtualEnv',
          message : 'Choose between Docker and Vagrant for local development',
          default : 'docker',
          choices : ['docker', 'vagrant']
        });
      } else {
        this.answers.virtualEnv = 'vagrant';
      }

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

    if (this.answers.backend === 'Loopback (nodejs)') {
      files = files.concat([
        'doc/deployment-node.md',
        'doc/database-node.md',
        'doc/tests-node.md',
      ]);

      if (this.answers.virtualEnv === 'vagrant') {
        files = files.concat([
          'doc/installation-node-vagrant.md',
        ]);
      } else if (this.answers.virtualEnv === 'docker'){
        files = files.concat([
          'doc/installation-node-docker.md',
        ]);
      }
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
       this.destinationPath(file.replace(/-node|-symfony|-react-redux|-no-client|-vagrant|-docker/, '')),
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

    if (this.answers.backend === 'Loopback (nodejs)') {
      files = files.concat([
        'database.json',
        'package.json',
        'yarn.lock',
        'pm2.yml',
        'shipitfile.js',
      ])
    }

    if (this.answers.virtualEnv === 'vagrant') {
      files = files.concat([
        'Vagrantfile',
      ])
    }

    return Promise.all(files.map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file.replace(/-node|-symfony/, '')),
       this.answers
     );
   }));
  }

  _addMigrationsTemplates () {
    if (this.answers.backend !== 'Loopback (nodejs)') {
      return Promise.resolve();
    }

    return Promise.all([
     'migrations/20161206103004-create-user.js',
     'migrations/sqls/20161206103004-create-user-up.sql',
     'migrations/sqls/20161206103004-create-user-down.sql',
    ].map(file => {
      return this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        this.answers
      );
    }));
  }

  _addProvisioningTemplates () {
    if (this.answers.backend === 'API Platform (Symfony)') {
      return this._addSymfonyDevopsTemplates();
    }

    if (this.answers.backend === 'Loopback (nodejs)') {
      return this._addNodeDevopsTemplates();
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
       this.destinationPath(file.replace(/-node|-symfony/, '')),
       this.answers
     );
   }));
  }

  _addNodeDevopsTemplates () {
    this.fs.copy(
      this.templatePath('devops-node/provisioning/roles'),
      this.destinationPath('devops/provisioning/roles'),
      this.answers
    );

    return Promise.all([
     'docker-compose-node.yml',
     'Dockerfile-node',
     'devops-node/docker/nginx.conf',
     'devops-node/provisioning/group_vars/prod',
     'devops-node/provisioning/group_vars/staging',
     'devops-node/provisioning/group_vars/vagrant',
     'devops-node/provisioning/hosts/prod',
     'devops-node/provisioning/hosts/staging',
     'devops-node/provisioning/hosts/vagrant',
     'devops-node/provisioning/vars/main.yml',
     'devops-node/provisioning/playbook.yml',
   ].map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file.replace(/-node|-symfony/, '')),
       this.answers
     );
   }));
  }

  _addNodeServerTemplates () {
    this.fs.copy(
      this.templatePath('server/boot'),
      this.destinationPath('server/boot'),
      this.answers
    )

    this.fs.copy(
      this.templatePath('server/models'),
      this.destinationPath('server/models'),
      this.answers
    )

    this.fs.copy(
      this.templatePath('tests'),
      this.destinationPath('tests'),
      this.answers
    )

    return Promise.all([
     'server/.eslintrc',
     'server/component-config.json',
     'server/config.json',
     'server/datasources.json',
     'server/datasources.local.js',
     'server/middleware.development.json',
     'server/middleware.json',
     'server/model-config.json',
     'server/server.js',
   ].map(file => {
     return this.fs.copyTpl(
       this.templatePath(file),
       this.destinationPath(file),
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

  _addServer () {
    if (this.answers.backend === 'Loopback (nodejs)') {
      return this._addNodeServerTemplates();
    } else if (this.answers.backend === 'API Platform (Symfony)') {
      return this._addSymfonyServer();
    } else {
      return Promise.resolve();
    }
  }

  installProject() {
    return this._addServer()
    .then(() => this._addConfigurationTemplates())
    .then(() => this._addDocumentation())
    .then(() => this._addProvisioningTemplates())
    .then(() => this._addMigrationsTemplates())
  }


  end() {
    // .gitgnore is not included by npm publish https://github.com/npm/npm/issues/3763
    // It can be bypassed by renaming a gitgnore file to .gitignore
    this.spawnCommandSync('mv', ['./gitignore', './.gitignore']);

    this.log('Everything went well, enjoy your new app!')
  }
};

module.exports = StackGenerator;
