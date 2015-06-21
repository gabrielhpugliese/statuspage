'use strict';

Meteor.publish('incidents', function () {
  return IncidentsColl.find();
});
