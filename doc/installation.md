# Installation

## Create and provision the vagrant

- Launch VM:

  - `vagrant up`
  - If you encounter error `ttyname failed: Inappropriate ioctl for devices`:
    - Update vagrant to the latest version from the website

- Launch the provisionning
  - Install [Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html#installation) on your machine if you do not have it already
  - `ansible-playbook devops/provisioning/playbook.yml -i devops/provisioning/hosts/vagrant --key-file=.vagrant/machines/default/virtualbox/private_key`

## Install the server

- **Connect to the vagrant as www-data**:

```bash
vagrant ssh
sudo su - www-data
```

- Go to your app folder: `cd /var/www/{myAppName}/current`
- Create your Symfony application `composer create-project symfony/skeleton api`
- Update your .env

```bash
TRUSTED_PROXIES=10.0.0.0/8
TRUSTED_HOSTS='{myAppName}.local, localhost, api'
```

- Add API Platform if you need it `cd api && composer req api`
- Install and configure the php code sniffer with SymfonyCustom coding standard `composer require --dev vincentlanglet/symfony3-custom-coding-standard && vendor/bin/phpcs --config-set installed_paths ../../vincentlanglet/symfony3-custom-coding-standard`
- Create the database `bin/console doctrine:database:create`
- Create the database schema `bin/console doctrine:schema:create`
- Browse your API: `http://10.0.0.10/index.php/api`
- That's it! You can now [create your first entity](https://api-platform.com/docs/distribution#bringing-your-own-model).

## Build your frontend code

- If you have a static frontend such as React:

  - Connect to the vagrant: `vagrant ssh`

  - Build the frontend code: `cd /var/www/{myAppName}/current/client && source .env && yarn build`

  - Symlink the frontend code in the web directory: `cd /var/www/{myAppName}/current/api/public && ln -s ../../client/build/ build`

  - Browse your static frontend: [https://10.0.0.10](https://10.0.0.10)

## Update your API base path

In the `app/config/routing.yaml` add a prefix for your api, it can be somethings like that:

```yaml
api:
  resource: '.'
  type: 'api_platform'
  prefix: '/api' # This line can be added
```

Then your API is available at [https://10.0.0.10/index.php/api](https://10.0.0.10/app_dev.php/api)
