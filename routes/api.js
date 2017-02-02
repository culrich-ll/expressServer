  var cluster = require('cluster');
  // State
  var next_user_id = 0;
  var users = {};

  exports.getalluser = function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(users));
    console.log('Worker: ' + cluster.worker.id);
    return next();
  };

  exports.createuser = function (req, res, next) {
    var user = req.body;
    user.id = next_user_id++;
    users[user.id] = user;
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(user));
    console.log('Worker: ' + cluster.worker.id);
    return next();
  };

  exports.getuser = function (req, res, next) {
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(users[parseInt(req.params.id)]));
    console.log('Worker: ' + cluster.worker.id);
    return next();
  };

  exports.changeuser = function (req, res, next) {
    var user = users[parseInt(req.params.id)];
    var changes = req.params;
    delete changes.id;
    for (var x in changes) {
      user[x] = changes[x];
    }
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(user));
    console.log('Worker: ' + cluster.worker.id);
    return next();
  };

  exports.deletuser = function (req, res, next) {
    delete users[parseInt(req.params.id)];
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(true));
    console.log('Worker: ' + cluster.worker.id);
    return next();
  };

  exports.startJDLgeneration = function (req, res, next) {
    var message = 'Start JDL generation';
    res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
    res.end(JSON.stringify(message));
    console.log('Worker: ' + cluster.worker.id);
    return next();
  };
