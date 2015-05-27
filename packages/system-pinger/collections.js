'use strict';

ResultsColl = new Mongo.Collection('results');
SystemsColl = new Mongo.Collection('systems', {
  transform: function (doc) {
    return new System(doc);
  }
});

if (Meteor.isServer) {
  SystemsColl._ensureIndex({name: 1});
}

