'use strict';
var both = ['client', 'server'];

Package.describe({
  summary: 'Sends emails and save addresses',
  version: '0.0.1',
  git: '',
  name: 'subscription-manager'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.use([
    'mongo',
    'email',
    'meteor-platform',
    'system-pinger'
  ], both);

  api.use([
    'event-emitter',
    'email-builder'
  ], 'server');

  api.addFiles(['collections.js',], both);
  api.addFiles([
    'main.js',
    'subscription-manager.js'
  ], 'server');

  api.export(['SubscriptionsColl'], both);
  api.export(['SubscriptionManager'], 'server');
});

Package.onTest(function (api) {
  var testsFolder = 'tests/server/';

  api.use('sanjo:jasmine@0.13.6');
  api.use('subscription-manager');
  api.use(['email', 'email-builder'], 'server');

  api.addFiles([
    testsFolder + 'subscription-manager-spec.js'
  ], 'server');
});
