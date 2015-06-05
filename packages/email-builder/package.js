'use strict';
var both = ['client', 'server'];

Package.describe({
  summary: 'Formats emails',
  version: '0.0.1',
  git: '',
  name: 'email-builder'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.use([
    'meteor-platform',
  ], both);

  api.addFiles([
    'email-builder.js'
  ], 'server');

  api.export(['EmailBuilder'], 'server');
});

Package.onTest(function (api) {
  var testsFolder = 'tests/server/';

  api.use('sanjo:jasmine@0.13.6');
  api.use('email-builder');

  api.addFiles([
    testsFolder + 'email-builder-spec.js'
  ], 'server');
});
