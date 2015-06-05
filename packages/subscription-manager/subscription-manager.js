'use strict';

var Fiber = Npm.require('fibers');
var publicSettings = Meteor.settings.public;

var _SubscriptionManager = function (subscriptionsColl, emailBuilder) {
  this.subscriptions = subscriptionsColl;
  this.emailBuilder = emailBuilder;
};

_SubscriptionManager.prototype._sendSubscribedEmail = function (email) {
  var emailData = this.emailBuilder.subscribed(email);

  return this.sendEmail(email, emailData.subject, emailData.body);
};

_SubscriptionManager.prototype.addEmail = function (email) {
  check(email, String);
  if (! validator.isEmail(email)) {
    throw new Meteor.Error('invalid-email', 'E-mail is invalid.');
  }

  this.subscriptions.insert({
    email: email
  });
  this._sendSubscribedEmail(email);
  console.log('Email ' + email + ' just subscribed.');
};

_SubscriptionManager.prototype.sendEmail = function (email, subject, body) {
  check(email, String);
  check(subject, String);
  check(body, String);

  new Fiber(function () {
    Email.send({
      to: email,
      from: Meteor.settings.emailFrom,
      subject: subject,
      text: body
    });
  }).run();
};

_SubscriptionManager.prototype.getEmailsCursor = function () {
  return this.subscriptions.find({});
};

_SubscriptionManager.prototype.sendEmailToAll = function (systemName, statusCodeNow, statusCodeBefore) {
  check(systemName, String);
  check(statusCodeNow, Number);
  check(statusCodeBefore, Number);

  var email = this.emailBuilder.statusChanged(systemName, statusCodeNow, statusCodeBefore);

  this.getEmailsCursor().forEach(function () {
    this.sendEmail(systemName, email.subject, email.body);
  }, this);
};

SubscriptionManager = new _SubscriptionManager(
  SubscriptionsColl,
  new EmailBuilder(publicSettings && publicSettings.head.title)
);
