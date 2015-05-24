'use strict';

ResultsColl = new Mongo.Collection('results');
SystemsColl = new Mongo.Collection('systems');

if (Meteor.isServer) {
  SystemsColl._ensureIndex({name: 1});
}

