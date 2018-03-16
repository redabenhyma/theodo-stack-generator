# Installation

### Create and provision the vagrant

- Launch VM:
  - `vagrant up`
  - If you encounter error `ttyname failed: Inappropriate ioctl for devices`:
    - Update vagrant to the latest version from the website

- Add your ssh key in the vagrant:
  - `vagrant ssh`
  - `vim .ssh/authorized_keys` and copy-paste your public key.

- Launch the provisionning
  - Install [Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html#installation) on your machine if you do not have it already
  - `ansible-playbook devops/provisioning/playbook.yml -i devops/provisioning/hosts/vagrant`
  - If the command fails, run:
    - `ssh-keygen -R 10.0.0.10 && ssh vagrant@10.0.0.10`
    - exit the vagrant

### Build your frontend code

- If you have a static frontend such as React:

  - Connect to the vagrant: `vagrant ssh`

  - Build the frontend code: `cd /var/www/<%= appName %>/current/client && source .env && yarn build`

  - Symlink the frontend code in the web directory: `cd /var/www/<%= appName %>/current/api/public && ln -s ../../client/build/ build`

  - Browse your static frontend: https://10.0.0.10

### Install the server

- Connect to the vagrant as www-data:
  - `vagrant ssh`
  - `sudo su www-data`

- Install dependencies
  - `cd /var/www/<%= appName %>/current/api && php composer install`

- Create the database schema
  - `cd /var/www/<%= appName %>/current/api && bin/console doctrine:schema:create`

- Run migrations:
  - `cd /var/www/<%= appName %>/current/api && bin/console doctrine:generate:entities AppBundle`

- Browse your API: https://10.0.0.10/app_dev.php


### Update your API base path

In the `app/config/routing.yml` add a prefix for your api, it can be somethings like that:

```
api:
    resource: '.'
    type:     'api_platform'
    prefix:   '/api'  # This line can be added
```
Then you api is available at https://10.0.0.10/app_dev.php/api
