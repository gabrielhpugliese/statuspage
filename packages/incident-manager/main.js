'use strict';

EventEmitter.on('systemchanged', function (systemName, status) {
  console.log('System "' + systemName + '" changed event received');
});
