'use strict';
var both = ['client', 'server'];

Package.describe({
  summary: 'Gives tools for managing incidents',
  version: '0.0.1',
  git: '',
  name: 'incident-manager'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.use([
    'mongo',
    'accounts-password',
    'accounts-ui',
    'alanning:roles@1.2.11'
  ], both);

  api.use([
    'meteor-platform',
    'event-emitter',
    'percolate:synced-cron',
    'momentjs:moment'
  ], 'server');

  api.addFiles([
    'collections.js'
  ], both);

  api.addFiles([
    'incident-manager.js',
    'main.js',
    'cron.js',
    'publications.js',
    'set-admin.js'
  ], 'server');

  api.export(['IncidentsColl'], both);
  api.export(['IncidentManager'], 'server');
});

Package.onTest(function (api) {
  var testsFolder = 'tests/server/';

  api.use('sanjo:jasmine@0.13.6');
  api.use('incident-manager');
  api.use(['momentjs:moment'], 'server');

  api.addFiles([
    testsFolder + 'incident-manager-spec.js',
    testsFolder + 'collections-spec.js'
  ], 'server');
});
