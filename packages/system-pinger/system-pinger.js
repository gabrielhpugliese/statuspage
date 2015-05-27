'use strict';
var Future = Npm.require('fibers/future');

var _SystemPinger = function () {
  this.systems = SystemsColl;
  this.results = ResultsColl;
};

_SystemPinger.prototype.addSystem = function (name, endpoint) {
  check(name, String);
  check(endpoint, String);

  return this.systems.insert({
    name: name,
    endpoint: endpoint
  });
};

_SystemPinger.prototype._getStatus = function (name) {
  check(name, String);

  var system = this.systems.findOne({name: name});
  var future = new Future();
  var errorCodes = {
    'ENOTFOUND': 404
  };

  if (! system) {
    throw new Meteor.Error('Could not find that system.');
  }

  HTTP.get(system.endpoint, Meteor.bindEnvironment(function (err, res) {
    var statusCode;

    if (err) {
      if (err.response) {
        statusCode = err.response.statusCode;
      } else {
        statusCode = errorCodes[err.code];
      }
    } else {
      statusCode = res.statusCode;
    }

    future.return(statusCode);
  }));

  return future.wait();
};

_SystemPinger.prototype._save = function (name, statusCode) {
  check(name, String);
  check(statusCode, Number);

  this.results.insert({
    name: name,
    statusCode: statusCode,
    updatedAt: new Date()
  });

  this.systems.update({name: name}, {$set: {
    lastStatusCode: statusCode,
    updatedAt: new Date()
  }});

  return true;
};

_SystemPinger.prototype.pingAndSave = function (name) {
  check(name, String);

  var statusCode = this._getStatus(name);

  this._save(name, statusCode);
};

SystemPinger = new _SystemPinger();
