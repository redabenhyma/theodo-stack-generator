## Installation

#### Create the vagrant
- Launch VM:
  - `vagrant up`
  - If you encounter error `ttyname failed: Inappropriate ioctl for devices`:
    - Update vagrant to the latest version from the website (it works on 1.9.5)

- Add your ssh key in the vagrant:
  - `vagrant ssh`
  - `vim .ssh/authorized_keys` and copy-paste your public key.

- Launch the provisionning
  - `ansible-playbook devops/provisioning/playbook.yml -i devops/provisioning/hosts/vagrant`
  - If the command fails, run:
    - `ssh-keygen -R 10.0.0.10 && ssh ubuntu@10.0.0.10`

- Install the project
  - Connect to the vagrant: `vagrant ssh`

If you have a frontend:
  - Build the frontend code: `cd /var/www/<%= appName %>/current/client && yarn build`

  - Symlink the frontend code in the web directory: `cd /var/www/<%= appName %>/current/server/web && ln -s ../../client/build/ build`

  - Browse your frontend: https://10.0.0.10

In all cases

- Run migrations:
  - `cd /var/www/<%= appName %>/current/server && app/console doctrine:generate:entities AppBundle`

- Browse your API: https://10.0.0.10/app_dev.php/doc

**TODO**
