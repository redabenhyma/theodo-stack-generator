# Theodo stack generator

This generator scripts everything you need to start a project with:
- [Api platform](https://api-platform.com/) or [Loopback](http://loopback.io/) (nodejs framework) server
- React-Redux or Angular4 client from awesome boilerplates
- Ansible provisioning with PHP7/node 8, nginx, www-data user, postgresql database
- Vagrant configuration
- Capistrano/Shipit deployment script


## Prerequisites

You need to install:

+ [Yeoman](http://yeoman.io/): `npm install -g yo`
+ [VirtualBox](https://www.virtualbox.org/wiki/Downloads)
+ [Vagrant](https://www.vagrantup.com/downloads.html)
+ Node.js (> 6.x) + Npm (install it with [nvm](https://github.com/creationix/nvm)): `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
+ [Ansible (version 2)](http://docs.ansible.com/ansible/intro_installation.html)
+ [Yarn](https://yarnpkg.com/en/docs/install)
+ [PHP](http://php.net/manual/en/intro-whatis.php) if you want to use API plateform (Symfony)


## Installation

### Choose a technology according to your needs

This generator will ask you to choose between 3 starter-kits (or no client at all).

- **React-Redux** from [Create React App starter-kit](https://github.com/facebookincubator/create-react-app):
  - A react starter-kit which generates a react-redux app!
  - For who ?
    - Those who want React-redux!

- **Angular4** from [Angular starter](https://github.com/AngularClass/angular-starter):
  - An Angular 4 starter-kit!
  - For who ?
    - Those who want Angular!


### Install the generator

- Install the package:
```
git clone git@github.com:theodo/theodo-stack-generator.git
cd theodo-stack-generator && npm link && cd ../
npm install -g theodo-stack-generator
```

## Usage

- Create a directory && run the generator:
```
mkdir myAwesomeProject && cd myAwesomeProject
yo theodo-stack
```

Then follow the generated documentation installation steps.

## What's next ?

- Vault ansible files to be able to commit them.

## Troubleshooting

At the moment, the `xubuntu` distrib doesn't support the vagrant `synced_folder` parameter with `xenial` OS, please choose `trusty` option if you are in that case

## Contributing to the generator

This generator can be improved in many ways, PR are welcome! [here](https://github.com/theodo/theodo-stack-generator) !

- Clone the repository.
- Run `npm link`
