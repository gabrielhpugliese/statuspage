'use strict';

Package.describe({
  summary: 'Pings the system',
  version: '0.0.1',
  git: '',
  name: 'system-pinger'
});

Package.onUse(function (api) {
  var both = ['client', 'server'];

  api.versionsFrom('METEOR@0.9.0');

  api.use(['mongo', 'http'], 'server');

  api.addFiles(['results.js', 'system-pinger.js', 'main.js'], 'server');

  api.export('SystemPinger', both);
});

Package.onTest(function (api) {
  api.use('sanjo:jasmine');
  api.use('system-pinger');
  api.addFiles('tests/server/system-pinger-spec.js', 'server');
});
