'use strict';

Meteor.setTimeout(function () {
  SystemPinger.collection.find().forEach(function (doc) {
    console.log('Pinging', doc.name);
    SystemPinger.pingAndSave(doc.name);
  });
}, 10 * 1000);
