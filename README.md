# Theodo stack generator

This generator scripts everything you need to start a project.

Choose a server between:

- [Api platform](https://api-platform.com/) with:
  - Ansible provisioning for:
    - PHP7
    - Yarn
    - nginx
    - creating www-data user
    - postgresql database
    - HTTPS configuration
  - Capistrano deployment script
  
- [Loopback](http://loopback.io/) (nodejs framework) server:
  - Ansible provisioning for:
    - Node 8
    - Yarn
    - nginx
    - creating www-data user
    - Postgresql database
    - HTTPS configuration
    - db-migrate and initial loopback migrations
  - Shipit deployment script


Choose if you want the client:

- React-Redux: A boosted [create-react-app](https://github.com/facebookincubator/create-react-app) with
  - redux
  - redux-saga
  - hot-reloading
  - react-intl with nested translations files!
  - react-router for routing
  - examples of unit and snapshot tests

## What's next ?

- Linters
- Unit tests
- End-to-end tests
- Authentication
- Vault ansible files to be able to commit them.

## Prerequisites

You need to install:
+ Node.js 8 + Npm (install it with [nvm](https://github.com/creationix/nvm)): `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
+ [Yarn](https://yarnpkg.com/en/docs/install)
+ [Yeoman](http://yeoman.io/): `npm install -g yo`

If you want a server (Symfony or Loopback) with the provisioning and the deployment scripts:
+ [docker-compose](https://docs.docker.com/compose/install/#prerequisites) **OR** [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html)
+ [Ansible (version >= 2)](http://docs.ansible.com/ansible/intro_installation.html)


## Installation

### Install the generator

- Install nvm: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
`
- Install the package:
```
nvm install 8.4.0
git clone git@github.com:theodo/theodo-stack-generator.git
cd theodo-stack-generator && yarn && npm link && cd ../
npm install -g theodo-stack-generator
```

## Usage

- Create a directory and run the generator:
```
mkdir myApp && cd myApp
yo theodo-stack
```

You will be prompted for a backend. If you just want to create a React-Redux app, choose **none**.

Then follow the generated documentation installation steps.

## Contributing to the generator

This generator can be improved in many ways, PR are welcome! [here](https://github.com/theodo/theodo-stack-generator) !

To install it and use it locally, follow the previous documentation.
