'use strict';

SubscriptionsColl = new Mongo.Collection('subscriptions');

if (Meteor.isServer) {
  SubscriptionsColl._ensureIndex({email: 1});
}
