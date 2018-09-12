# 2. Authentication

Date: 2018-09-12
Authors :

- Benjamin Grandfond <benjaming@theodo.fr>
- Jonathan Beurel <jonathanb@theodo.fr>
- Nicolas Boutin <nicolasbo@theodo.fr>

## Status

Accepted

## Context

We must authenticate clients of API and users in the React app. We wrote 
[a standard](https://m33.gitbook.io/standards/technical-gesture/authentication/react-and-api-platform-sf4-jwt-authentication) 
for this. 

To add this in the generator we have to 
- install some bundles
- generate some code and SQL migrations
- configure Symfony security, routes
- regenerate a public / private keypair
- add an authentication form
- add a full Redux lifcycle to handle form submission

## Decision

### Symfony side

We will create a yeoman subgenerator that will:
- install SymfonyMakeBundle and DoctirneMigrationsBundle: ```vagrant ssh -c 'cd path/to/project composer require make migrations'```
- create the [user doctrine entity](https://github.com/symfony/maker-bundle/blob/master/src/Maker/MakeUser.php): ```vagrant ssh -c 'cd path/to/project bin/console make:user```
- generate the [doctrine migration](https://github.com/symfony/maker-bundle/blob/master/src/Maker/MakeMigration.php): ```vagrant ssh -c 'cd path/to/project bin/console make:migration```
- update it to add a user in the database with a codemod
- install the bundle with symfony flex
- add a route "login_check" in routes.yml  
- configure the security.yml with
    - add a new user provider in the security.yml
    - configure the firewall in the security.yml
    - add the access controls for the "login_check" route and the ones to secure
- regenerate the public private key pair

### React application steps 
to be defined


## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
