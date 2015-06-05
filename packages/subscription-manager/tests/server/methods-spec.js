'use strict';

describe('Subscription Manager Methods', function () {
  var email = 'foo@bar.com';

  it('adds emails on subscribe', function () {
    var addEmail = spyOn(SubscriptionManager, 'addEmail');

    Meteor.call('SubscriptionManager/subscribe', email);

    expect(addEmail).toHaveBeenCalledWith(email);
  });
});
