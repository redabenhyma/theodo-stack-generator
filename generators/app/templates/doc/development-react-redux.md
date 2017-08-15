# How to develop using webpack

 Webpack can watch your frontend files and recompiles the code automatically as soon as you change your code.

 :bangbang: The webpack live-reloading is really slow in a virtual machine such as Vagrant. To avoid that, run the webpack-dev-server on your local environment, but run your server in a virtual machine.

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
