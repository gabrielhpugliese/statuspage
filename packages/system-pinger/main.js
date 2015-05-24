'use strict';

Meteor.setTimeout(function () {
  Systems.find().forEach(function (doc) {
    console.log('Pinging', doc.name);
    SystemPinger.pingAndSave(doc.name);
  });
}, 60 * 1000);
