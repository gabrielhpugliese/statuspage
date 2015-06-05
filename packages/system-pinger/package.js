'use strict';
var both = ['client', 'server'];

Package.describe({
  summary: 'Pings the system',
  version: '0.0.1',
  git: '',
  name: 'system-pinger'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.use([
    'mongo',
    'http',
    'check',
    'meteor-platform'
  ], both);

  api.use([
    'event-emitter'
  ], 'server');

  api.addFiles(['system.js', 'collections.js'], both);
  api.addFiles(['publications.js', 'system-pinger.js', 'main.js'], 'server');

  api.export('SystemPinger', 'server');
  api.export(['ResultsColl', 'SystemsColl'], both);
});

Package.onTest(function (api) {
  api.use('sanjo:jasmine@0.13.6');
  api.use('system-pinger');
  api.use(['http'], both);

  api.addFiles('tests/jasmine/server/unit/system-pinger-spec.js', 'server');
});
