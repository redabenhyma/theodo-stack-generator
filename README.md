# Theodo stack generator

This generator scripts everything you need to start a React-Redux project with either no backend, API Platform (Symfony) or Loopback (nodejs)

Choose a server between:

- No server at all. You just want an awesome frontend.

- [Api platform](https://api-platform.com/) with:
  - Ansible provisioning for:
    - PHP7
    - Yarn
    - nginx
    - creating www-data user
    - postgresql database
    - HTTPS configuration
  - Capistrano deployment script

- [Loopback](http://loopback.io/) ([DEPRECATED](http://blog.m33.network/2017/05/stacks-technique-theodo/)):
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
  - react-router for creating multiples pages
  - examples of unit and snapshot tests
  - Eslint with airbnb linter
  - Immutable.JS

## What's next ?

- End-to-end tests
- Authentication
- Vault ansible files to be able to commit them.

## Prerequisites

You need to install:
+ [Yarn](https://yarnpkg.com/en/docs/install)

If you want a server (Symfony or Loopback) with the provisioning and the deployment scripts:
+ [docker-compose](https://docs.docker.com/compose/install/#prerequisites) **OR** [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html)
+ [Ansible (version >= 2)](http://docs.ansible.com/ansible/intro_installation.html)


## Installation

### Install the generator

- Install nvm: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`

- Install node 8.4:
  - `nvm install 8.4.0`
  - `nvm alias default 8.4`
  - `nvm use default`

- Install Yeoman globally: `npm install -g yo`

- Install the package:
```
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

You will be prompted for a backend. If you just want to create a React-Redux app, choose **none** and then React-Redux.

Then follow the generated documentation installation steps.

## Contributing to the generator

This generator can be improved in many ways, PR are welcome! [here](https://github.com/theodo/theodo-stack-generator) !

To install it and use it locally, follow the previous documentation.
