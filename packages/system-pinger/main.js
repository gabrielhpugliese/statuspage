'use strict';

Meteor.setInterval(function () {
  SystemsColl.find().forEach(function (doc) {
    console.log('Pinging', doc.name);
    SystemPinger.pingAndSave(doc.name);
  });
}, 60 * 1000);
