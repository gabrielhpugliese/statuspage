'use strict';

/*
 * Main loop to ping all systems in a interval
 */
Meteor.setInterval(function () {
  SystemsColl.find().forEach(function (doc) {
    console.log('Pinging', doc.name);
    SystemPinger.pingAndSave(doc.name);
  });
}, 10 * 1000);


/*
 * We observe changes to systems and send an event about it so other packages
 * can take actions, e.g., send e-mails about it.
 */
SystemsColl.find({}, {fields: {name: 1, lastStatusCode: 1}}).observe({
  changed: function (newDocument, oldDocument) {
    EventEmitter.emit('systemchanged', newDocument.name, {
      now: newDocument.lastStatusCode,
      before: oldDocument.lastStatusCode
    });
  }
});
