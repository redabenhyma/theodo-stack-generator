# Theodo stack generator

This generator scripts everything you need to start a React-Redux project with an API Platform (Symfony) server.

**Objective: launch a project in 2 hours - make an [issue](https://github.com/theodo/theodo-stack-generator/issues) if you don't succeed !**

## Choose a server

- No server at all, you want an awesome frontend.

- [Api platform](https://api-platform.com/) with:
  - Ansible provisioning for:
    - PHP7
    - Yarn
    - Nginx
    - Creating www-data user
    - Postgresql database
    - HTTPS configuration
  - Capistrano deployment script

## Choose a client

- React-Redux: A boosted [create-react-app](https://github.com/facebookincubator/create-react-app) with
  - Redux
  - Redux-saga
  - Hot-reloading
  - React-intl with nested translations files!
  - React-router 4 for creating multiples pages
  - Examples of unit and snapshot tests
  - Eslint with airbnb linter
  - Flow
  - Prettier
  - Plop scripts to generate React components

## What's next

- End-to-end tests
- Authentication
- Vault ansible files to be able to commit them.

## Prerequisites

You need to install:

- [Yarn](https://yarnpkg.com/en/docs/install)

If you want a server with the provisioning and the deployment scripts:
[VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant](https://www.vagrantup.com/downloads.html)

- [Ansible (version >= 2)](http://docs.ansible.com/ansible/intro_installation.html)

## Installation

### Install the generator

- Install nvm: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`

- Install node 8.4:
  - `nvm install 8.4.0`
  - `nvm alias default 8.4`
  - `nvm use default`

- Install Yeoman globally: `npm install -g yo`

- Install the package:

```bash
nvm use 8.4.0
git clone git@github.com:theodo/theodo-stack-generator.git
cd theodo-stack-generator && yarn && npm link && cd ../
```

## Usage

- Create an **empty** directory and run the generator:

``` bash
nvm use 8.4.0
mkdir my-app && cd my-app
yo theodo-stack my-app
```

- Clean your NODE_PATH and Launch your React app in the client folder:

```bash
unset NODE_PATH
yarn start
```

For the client, you may need to source the .env file (`source .env`) if you want to use absolute PATH. Also see: [this issue on create-react-app repository](https://github.com/facebook/create-react-app/issues/2300)

## Update the generator

You only need to pull the latest changes from your theodo-stack-directory. npm link created a symlink to your installation so it is automatic.

- From the theodo-stack-generator directory

``` bash
git pull
```

## Contributing to the generator
*Administrators: thibautc@theodo.fr, benjaming@theodo.fr, nicolasb@theodo.fr, georgesb@theodo.fr*

This generator can be improved in many ways, PR are welcome! [here](https://github.com/theodo/theodo-stack-generator) !

- To install it and use it locally, follow the previous documentation.
- When you make a change to the generator in local, you can use it immediatly with your changes
- How to develop ?
  - Change the code
  - Generate a new project
  - See if your new project works
- To merge a PR **it must have been approved by one of the administrators**
