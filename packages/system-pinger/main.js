'use strict';

Meteor.setInterval(function () {
  SystemsColl.find().forEach(function (doc) {
    console.log('Pinging', doc.name);
    SystemPinger.pingAndSave(doc.name);
  });
}, 10 * 1000);
