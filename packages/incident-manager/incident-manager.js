'use strict';

IncidentManager = function (incidents) {
  check(incidents, Mongo.Collection);
  this.incidents = incidents;
};

IncidentManager.prototype.create = function (date, description) {
  check(date, Date);
  check(description, String);

  this.incidents.insert({
    insertedAt: date,
    updatedAt: date,
    resolvedAt: date,
    description: description
  });
};
