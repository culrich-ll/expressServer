var cluster = require('cluster');

if (cluster.isMaster)
{
  console.log('Server is active. Forking workers now.');
  var cpuCount = require('os').cpus().length;
  for (var i=0; i<cpuCount; i++)
  {
    cluster.fork();
  }
  cluster.on('exit', function(worker)
  {
    console.error('Worker %s has died! Creating a new one.', worker.id);
    cluster.fork();
  });
}
else {
  const cookieSession = require('cookie-session');
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const port = process.env.PORT || 8090;
  const methodOverride = require('method-override');
  const api = require('./routes/api');
  const config = require('./config/config');

  // Handle body
  app.use(bodyParser.json());

// Parse application/json as json
  app.use(bodyParser.json({type: 'application/json; charset=utf-8'}));

// Override with the X-HTTP-Method-Override header in the request
  app.use(methodOverride('X-HTTP-Method-Override'));

// Session
  app.use(cookieSession({
    name: 'session',
    keys: [config.secret],

    // sample cookie options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }));

  app.get("/", api.getalluser);
  app.get('/user/:id', api.getuser);
  app.post('/user', api.createuser);
  app.put('/user/:id', api.changeuser);
  app.delete('/user/:id', api.deletuser);
  app.get("/start", api.startJDLgeneration);

  app.listen(port, function () {
    console.log('Worker %s spawned for port %s.', cluster.worker.id, port);
  });

}