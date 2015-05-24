'use strict';
var Future = Npm.require('fibers/future');

var _SystemPinger = function () {
  this.collection = Systems;
  this.collection._ensureIndex({name: 1});
};

_SystemPinger.prototype.addSystem = function (name, endpoint) {
  check(name, String);
  check(endpoint, String);

  this.collection.insert({
    name: name,
    endpoint: endpoint
  });
};

_SystemPinger.prototype._getStatus = function (name) {
  check(name, String);

  var system = this.collection.findOne({name: name});
  var future = new Future();

  if (! system) {
    throw new Meteor.Error('Could not find that system.');
  }

  HTTP.get(system.endpoint, Meteor.bindEnvironment(function (err, res) {
    if (err) {
      return future.throw(err);
    }

    future.return(res.statusCode);
  }));

  return future.wait();
};

_SystemPinger.prototype.pingAndSave = function (name) {
  check(name, String);

  var statusCode = this._getStatus(name);

  Results.insert({
    name: name,
    statusCode: statusCode,
    when: new Date()
  });

  this.collection.update({name: name}, {$set: {
    lastStatusCode: statusCode
  }});
};

SystemPinger = new _SystemPinger();
