# Theodo stack generator ![Current npm package version](https://img.shields.io/npm/v/generator-theodo-stack.svg?style=flat-square)

🏆 **Objectives:**

- launch a project in 2 hours
- upgrade an existing project to our standards

☝️In any case, open an [issue](https://github.com/theodo/theodo-stack-generator/issues) if you don't succeed !

## Features

With the Theodo Stack Generator you can

- create a new project with React + a Symfony API: `yo theodo-stack`
- create a new React application: `yo theodo-stack:react`
- create a new Symfony API: `yo theodo-stack:server`

Upgrade an existing React project:

- add CircleCI configuration: `yo theodo-stack:react-ci`
- add and configure Flow: `yo theodo-stack:react-flow`
- add and configure linter: `yo theodo-stack:react-lint`
- add Plop.js generators: `yo theodo-stack:react-plop`

And many more (to come), to list what you can do: `yo --help`

## Let's use it!

```
npm install -g theodo-stack-generator
yo theodo-stack
```

## Prerequisites

If you want a server with the provisioning and the deployment scripts:

- [VirtualBox](https://www.virtualbox.org/wiki/Downloads) and [Vagrant (version >= 2)](https://www.vagrantup.com/downloads.html)
- [Ansible (version >= 2)](http://docs.ansible.com/ansible/intro_installation.html)

## Usage

- Create an **empty** directory and run the generator:

```bash
mkdir my-app && cd my-app
yo theodo-stack
```

- Clean your NODE_PATH and Launch your React app in the client folder:

```bash
unset NODE_PATH
yarn start
```

For the client, you may need to source the .env file (`source .env`) if you want to use absolute PATH. Also see: [this issue on create-react-app repository](https://github.com/facebook/create-react-app/issues/2300)

## Set-up and develop on your generated project

- [Installation](doc/installation.md)
- [Database](doc/database.md)
- [Development](doc/development.md)
- [Deployment](doc/deployment.md)
- [Server installation](doc/provisioning.md)
- [Tests](doc/tests.md)

## Update the generator

**If you installed it with npm:**
`npm update -g theodo-stack-generator`

**If you cloned it:**
You only need to pull the latest changes from your theodo-stack-directory. npm link created a symlink to your installation so it is automatic.

- From the theodo-stack-generator directory

```bash
git pull
```

## Wanna contribute to the Theodo Stack Generator?

**Prerequisites:**

- node >= 10.9

**Installation:**

- Install Yeoman globally: `yarn add global yo`
- Install the package:

```bash
git clone git@github.com:theodo/theodo-stack-generator.git
cd theodo-stack-generator && yarn && npm link
```

You can use nvm if you don't have the right node version:

- Install nvm: `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash`
- Install and use node 10.9:
  - `nvm install 10.9.0`
  - `nvm use 10.9.0`

**Make a change:**

- Change the code, you don't need to do re `npm link` as it created a symlink to the generator directory
- Check everything still works fine generating a project (yest this is painful and [we will work on it](https://github.com/theodo/theodo-stack-generator/issues/197))

- When you make a change to the generator in local, you can use it immediatly with your changes

PR **must have been approved by one of the administrators** to be merged.

## Administrators and contributors

- thibautc@theodo.fr
- benjaming@theodo.fr
- nicolasb@theodo.fr
- georgesb@theodo.fr

This generator can be improved in many ways, PR are welcome! [here](https://github.com/theodo/theodo-stack-generator) !
