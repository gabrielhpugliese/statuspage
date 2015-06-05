'use strict';

EventEmitter.on('systemchanged', function (systemName, status) {
  console.log('System "' + systemName + '" changed event received');
  SubscriptionManager.sendEmailToAll(systemName, status.now, status.before);
});
