'use strict';

var _SubscriptionManager = function () {
  this.subscriptions = SubscriptionsColl;
};

_SubscriptionManager.prototype.addEmail = function (email) {
  check(email, String);

  return this.subscriptions.insert({
    email: email
  });
};

_SubscriptionManager.prototype.sendEmail = function (email, subject, body) {
  check(email, String);
  check(subject, String);
  check(body, String);

  subject = '[' + Meteor.settings.public.head.title + ' status] ' + subject;

  return Email.send({
    to: email,
    from: Meteor.settings.emailFrom,
    subject: subject,
    text: body
  });
};

SubscriptionManager = new _SubscriptionManager();
