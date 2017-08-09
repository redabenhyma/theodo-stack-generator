## Installation

#### Create the vagrant
- Launch VM:
  - `vagrant up`
  - If you encounter error `ttyname failed: Inappropriate ioctl for devices`:
    - Update vagrant to the latest version from the website (it works on 1.9.5)
- Launch the provisionning
  - `ansible-playbook devops/provisioning/playbook.yml -i devops/provisioning/hosts/vagrant `
- Connect to the vagrant as www-data:
  - `vagrant ssh`
  - `sudo su www-data`

**TODO**
