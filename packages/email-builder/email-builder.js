'use strict';

EmailBuilder = function (title) {
  this.title = title || 'Status Monitor';
};

EmailBuilder.prototype.subscribed = function () {
  return {
    subject: '[' + this.title + '] Subscription created',
    body: 'Thanks for subscribing to ' + this.title + ' updates.'
  };
};

EmailBuilder.prototype.statusChanged = function (systemName, statusCodeNow, statusCodeBefore) {
  check(systemName, String);
  check(statusCodeNow, Number);
  check(statusCodeBefore, Number);

  var subject = '[' + this.title + '] System ' + systemName + ' status change';
  var body = 'The system ' + systemName + ' has changed status code from ' + statusCodeBefore + ' to ' + statusCodeNow;

  return {
    subject: subject,
    body: body
  };
};
