'use strict';

SyncedCron.add({
  name: 'Create a new day at IncidentsColl at midnight',
  schedule: function (parser) {
    return parser.text('at 00:01 every day');
  },
  job: function () {

  }
});
