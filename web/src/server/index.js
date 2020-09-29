const http = require('http');
const app = require('express')();
const proxy = require('express-http-proxy');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.HTTP_PORT = process.env.HTTP_PORT || 30002;

function onUnhandledRejection(err) {
  console.log('APPLICATION ERROR:', err);
}

function onUnhandledException(err) {
  console.log('FATAL ERROR:', err);
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledRejection);
process.on('uncaughtException', onUnhandledException);

const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

app.set('env', process.env.NODE_ENV);

app.use('/', proxy('http://localhost:30001', {
  filter: function (req, res) {
    return req.url.startsWith('/api');
  }
}));
setupAppRoutes(app);

const srvr = http.createServer(app);
srvr.listen(process.env.HTTP_PORT, () => {
  console.log(`Server is now running on http://localhost:${process.env.HTTP_PORT}`);
});
srvr.timeout = 1800000;
