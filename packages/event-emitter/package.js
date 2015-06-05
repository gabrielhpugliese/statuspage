'use strict';
var both = ['client', 'server'];

Package.describe({
  summary: 'Npm event emitter',
  version: '0.0.1',
  git: '',
  name: 'event-emitter'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.0');

  api.use([
    'meteor-platform',
  ], both);

  api.addFiles(['event-emitter.js'], 'server');

  api.export(['EventEmitter'], 'server');
});
