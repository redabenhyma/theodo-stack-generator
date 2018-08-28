# How to develop using webpack with Vagrant

 Webpack can watch your frontend files and recompiles the code automatically as soon as you change your code.

 :bangbang: The webpack live-reloading is really slow in a virtual machine such as Vagrant. To avoid that, run `cd client && yarn start` on your local environment, but run your server in the Vagrant

 If you have a server in a Vagrant, consider it as an external API that you will query from your local app.

 In your local environment, all your HTTP requests should be redirected to the server IP address.

 For example, if you want to fetch the url `/api/users`, you can adapt the file `client/utils/request.js` to use the following snippet:

 ```javascript

const request = function(url) {
  let baseApiPath = '';
  let options = {
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  };

  if (process.env.NODE_ENV === 'development') {
    baseApiPath = 'http://10.0.0.10';
    options.credentials = 'include'; // needed for CORS requests to the vagrant
  }

  return fetch(`${baseApiPath}/${url}`, options)
}

request('api/users')
.then(console.log)
 ```

 # Manage your environments

 You can use custom .env.* files (not only *.env.development*, *.env.test* and *.env.production*) to load your environment variables before building by managing the REACT_APP_ENV environment variable.

 You can either set the REACT_APP_ENV variable on your server or prefix the commande like this: `REACT_APP_ENV=staging yarn build`.

 An env file is just a list of `KEY=VALUE` pairs.

