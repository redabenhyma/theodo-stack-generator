# Theodo stack generator

This generator scripts everything you need to start a project with:
- [Api platform](https://api-platform.com/) or [Loopback](http://loopback.io/) (nodejs framework) server
- React-Redux or Angular4 client from awesome boilerplates
- Ansible provisioning with PHP7/node 8, nginx, www-data user, postgresql database
- Vagrant configuration
- Capistrano/Shipit deployment script

## What's next ?

- HTTPS configuration
- Linters
- Unit tests
- End-to-end tests
- Authentication

## Prerequisites

You need to install:
+ Node.js (> 6.x) + Npm (install it with [nvm](https://github.com/creationix/nvm)): `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
+ [Yarn](https://yarnpkg.com/en/docs/install)
+ [Yeoman](http://yeoman.io/): `npm install -g yo`

If you want a server (Symfony or Loopback) with the provisioning and the deployment scripts:
+ [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
+ [Vagrant](https://www.vagrantup.com/downloads.html)
+ [Ansible (version 2)](http://docs.ansible.com/ansible/intro_installation.html)
+ [PHP](http://php.net/manual/en/intro-whatis.php) if you want to use API plateform (Symfony) :
  - Symfony requires you to configure your [local PHP timezone ](https://stackoverflow.com/questions/20743060/symfony2-and-date-default-timezone-get-it-is-not-safe-to-rely-on-the-system)


## Installation

### Choose a technology according to your needs

This generator will ask you to choose between 2 starter-kits (or no client at all).

- **React-Redux**:
  - A react starter-kit which generates a react-redux app based on [Create React App starter-kit](https://github.com/facebookincubator/create-react-app)!

- **Angular4**:
  - An Angular 4 starter-kit which generates an Angular4 app based on [Angular starter](https://github.com/AngularClass/angular-starter)!


### Install the generator

- Install the package:
```
git clone git@github.com:theodo/theodo-stack-generator.git
cd theodo-stack-generator && yarn && npm link && cd ../
npm install -g theodo-stack-generator
```

## Usage

- Create a directory and run the generator:
```
mkdir myAwesomeProject && cd myAwesomeProject
yo theodo-stack
```

If you choose API Platform, you will be prompt to enter:
- `database_driver`, enter: `pdo_pgsql` to use postgresql which is already provisioned by ansible.
- `database_port`, enter: `5432`
- `database_name`, enter your **app name**.
- `database_user`, enter your **app name**.

Then follow the generated documentation installation steps.

## What's next ?

- Vault ansible files to be able to commit them.

## Troubleshooting

At the moment, the `xubuntu` distrib doesn't support the vagrant `synced_folder` parameter with `xenial` OS, please choose `trusty` option if you are in that case

## Contributing to the generator

This generator can be improved in many ways, PR are welcome! [here](https://github.com/theodo/theodo-stack-generator) !

To install it and use it locally, follow the previous documentation.
