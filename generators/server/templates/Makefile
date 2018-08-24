.PHONY: help
help:
	@echo 'TODO Write Me'

.PHONY: setup
setup: check_deps install_client install_admin generate_jwt install_api run_fixtures setup_hosts

.PHONY: check_deps
# Checks that the required dependencies are installed
check_deps:
	@which vagrant > /dev/null 2>&1 || (echo -e '\033[5;31mvagrant is not installed\033[0m' && exit 42)
	@which composer > /dev/null 2>&1 || (echo -e '\033[5;31mcomposer is not installed\033[0m' && exit 42)
	@which ansible-playbook > /dev/null 2>&1 || (echo -e '\033[5;31mansible-playbook is not installed\033[0m' && exit 42)
	@which vboxmanage > /dev/null 2>&1 || (echo -e '\033[5;31mvboxmanage is not installed\033[0m' && exit 42)
	# Checks that the udp port for nfs is available on the host, required by vagrant
	@rpcinfo | grep udp | grep nfs 2>&1 > /dev/null || (echo -e '\033[5;31mNFS is not serving over UDP\033[0m' && exit 42)

.PHONY: provision_vagrant
provision_vagrant: check_deps
	@vagrant up
	@ansible-playbook devops/provisioning/playbook.yml -i devops/provisioning/hosts/vagrant --ask-vault-pass --private-key .vagrant/machines/default/virtualbox/private_key

.PHONY: install_client
install_client: provision_vagrant check_deps
	@vagrant ssh -c 'cd /var/www/<%= appName %>/current/client && yarn'
	@vagrant ssh -c 'cd /var/www/<%= appName %>/current/client && source .env && yarn build'
	@vagrant ssh -c 'cd /var/www/<%= appName %>/current/api/public && ln -s ../../client/build/ build'

.PHONY: install_api
install_api: check_deps
	@vagrant ssh -c 'composer create-project symfony/skeleton api'
	@vagrant ssh -c 'composer req api'
	@vagrant ssh -c 'echo TRUSTED_PROXIES=10.0.0.0/8 >> /var/www/<%= appName %>/current/api/.env'
	@vagrant ssh -c "echo TRUSTED_HOSTS='<%= appName %>.local,localhost,api' >> /var/www/<%= appName %>/current/api/.env"
	@vagrant ssh -c 'sudo -u www-data -- sh -c "cd /var/www/<%= appName %>/current/api && php composer install"'
	@vagrant ssh -c "sed -i.bak s/^DATABASE_NAME=.*\$\// /var/www/<%= appName %>/current/api/.env"
	@vagrant ssh -c 'sudo -u www-data -- sh -c "cd /var/www/<%= appName %>/current/api && bin/console doctrine:database:create"'
	@vagrant ssh -c 'sudo -u www-data -- sh -c "cd /var/www/<%= appName %>/current/api && bin/console doctrine:schema:create"'

.PHONY: setup_hosts
setup_hosts:
	@cat /etc/hosts | grep <%= appName %>.local || printf "Hosts entry missing, please run:\n  sudo -- sh -c \"echo '10.0.0.10 <%= appName %>.local <%= appName %>.local' >> /etc/hosts\"\n"
