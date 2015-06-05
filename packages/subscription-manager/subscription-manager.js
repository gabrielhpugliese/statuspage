'use strict';

var _SubscriptionManager = function (subscriptionsColl) {
  this.subscriptions = subscriptionsColl;
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

_SubscriptionManager.prototype.getEmailsCursor = function () {
  return this.subscriptions.find({});
};

_SubscriptionManager.prototype.sendEmailToAll = function (systemName, statusCodeNow, statusCodeBefore) {
  check(systemName, String);
  check(statusCodeNow, Number);
  check(statusCodeBefore, Number);

  var emailSubject = 'System ' + systemName + ' status change';
  var emailBody = 'The system ' + systemName + ' has from status ' + statusCodeBefore + 'changed to ' + statusCodeNow + ' status code.';

  this.getEmailsCursor.forEach(function () {
    this.sendEmail(systemName, emailSubject, emailBody);
  }, this);
};

SubscriptionManager = new _SubscriptionManager(SubscriptionsColl);
