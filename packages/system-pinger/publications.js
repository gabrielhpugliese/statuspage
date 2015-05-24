'use strict';

Meteor.publish('systems', function () {
  return SystemsColl.find();
});

Meteor.publish('results', function () {
  return ResultsColl.find();
});
