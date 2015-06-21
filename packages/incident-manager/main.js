'use strict';

EventEmitter.on('systemchanged', function (systemName, status) {
  console.log('System "' + systemName + '" changed event received by incident manager');
  var incidentManager = new IncidentManager(IncidentsColl);

  incidentManager.create(
    status,
    new Date(),
    'System "' + systemName  + '" changed status from ' + status.before + ' to ' + status.now
  );
});
