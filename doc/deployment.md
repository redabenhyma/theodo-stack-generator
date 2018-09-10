# The deployment

- Create a git repository: `git init`

- Add this repository on a remote git url (github for example).

- Configure the `devops/deploy/stages` files with the remote repository url and the server IP address if you haven't done it yet.

- Install Capitrano: `bundle install`

- ssh to the server as ubuntu and become www-data: `sudo su www-data`

- Create the `~/.ssh/authorized_keys` file

- Add your public key in the file

- Check that you can ssh as www-data to the server.

- Deploy the code: `cap staging deploy`:
  - The first deployment will create the structure of the project. It will fail because the `parameters.yml` file is not present in the the shared folder, you have to **create it now**.
  - Deploy the code again

If deployment fails, it maybe because:

- yarn/npm install requires a lot of memory. To bypass this issue, [add some swap file](https://www.cyberciti.biz/faq/linux-add-a-swap-file-howto/)

- yarn don't have enough permissions to write its cache

### Rollback

If you need to rollback after a deployment:

- Make sure to rollback your new migrations before rolling back the code as these migrations won't be available once your code is back to the previous version.
  - Roll back to the last migration before your deployment:  `bin/console doctrine:migrations:migrate LAST_MIGRATION_BEFORE_DEPLOYMENT_ID`

- Rollback the code: `cap staging deploy:rollback`
