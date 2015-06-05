'use strict';

EventEmitter.on('systemchanged', function (systemName, status) {
  SubscriptionManager.sendEmailToAll(systemName, status.now, status.before);
});
