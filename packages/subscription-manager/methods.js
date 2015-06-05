'use strict';

Meteor.methods({
  'SubscriptionManager/subscribe': function (email) {
    SubscriptionManager.addEmail(email);

    return true;
  }
});
