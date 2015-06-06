'use strict';

IncidentManager = function (incidents) {
  check(incidents, Mongo.Collection);
  this.incidents = incidents;
};

IncidentManager.prototype.create = function (status, date, description) {
  check(date, Date);
  check(description, String);

  if (IncidentsColl.dayHasZeroStatus(date)) {
    return new Meteor.Error(
      'zero-status-at-day',
      'You cannot add two zero statuses on the same day'
    );
  }

  return this.incidents.insert({
    insertedAt: date,
    updatedAt: date,
    resolvedAt: date,
    description: description,
    status: status
  });
};
