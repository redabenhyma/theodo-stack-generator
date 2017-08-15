## Installation

#### Create the vagrant
- Launch VM:

  - `vagrant up`

  - If you encounter error `ttyname failed: Inappropriate ioctl for devices`:
    - Update vagrant to the latest version from the website (it works on 1.9.5)

- Add your ssh key in the vagrant:
  - `vagrant ssh`
  - `vim .ssh/authorized_keys`

- Launch the provisionning
  - `ansible-playbook devops/provisioning/playbook.yml -i devops/provisioning/hosts/vagrant`
  - If the command fails, run:
    - `ssh-keygen -R 10.0.0.10 && ssh ubuntu@10.0.0.10`

- Connect to the vagrant as www-data:
  - `vagrant ssh`
  - `sudo su www-data`

- Install dependencies:
  - `cd /var/www/<%= appName %>/current && yarn`

#### Setup database

- Run migrations:
  - `cd /var/www/<%= appName %>/current && yarn migrate:up`

#### Start the server

- Start the server:
  - `cd /var/www/<%= appName %>/current && yarn server:watch`

Now, you are set up !

You can browse a static page served by Loopback at the following url : `https://10.0.0.10`
You can also browse Loopback's explorer at : `https://10.0.0.10/explorer`

### Migrations:

In your vagrant, run:

- Create: `npm run migrate:create`
- Down: `npm run migrate:down`
- Up: `npm run migrate:up`
