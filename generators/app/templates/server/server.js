const loopback = require('loopback');
const boot = require('loopback-boot');
const app = module.exports = loopback();
const history = require('connect-history-api-fallback')

app.use(loopback.token({
    model: app.models.accessToken,
    currentUserLiteral: 'me'
}));

// This rewrites all routes requests to the root /index.html file
app.use(history({
  rewrites: [
    {
      from: /\/(api|explorer)/,
      to: (context) => {
        return context.parsedUrl.pathname
      }
    }
  ]
}))

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};
// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
