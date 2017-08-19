# config valid only for current version of Capistrano
lock '3.4.0'

set :deploy_to, "/var/www/<%= appName %>"
#set :repo_url, 'git@github.com:fansible/tywin.git'
set :repo_url, '<%= repositoryUrl %>'

set :stages, %w(prod)

set :symfony_directory_structure, 3

set :linked_files, fetch(:linked_files, []).push('app/config/parameters.yml')

set :ssh_user, 'www-data'
set :ssh_options, {
  forward_agent: true,
}

set :branch, 'master'
set :keep_releases, 3

set :composer_install_flags, '--prefer-dist --no-interaction --optimize-autoloader'
