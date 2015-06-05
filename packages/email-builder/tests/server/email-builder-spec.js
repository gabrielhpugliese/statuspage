describe('Email Builder', function () {
  'use strict';
  var title = 'Monitor';
  var emailBuilder;

  beforeEach(function () {
    emailBuilder = new EmailBuilder(title);
  });

  it('formats emails of status changed', function () {
    expect(emailBuilder.statusChanged('1', 2, 3)).toEqual({
      subject: '[' + title + '] System 1 status change',
      body: 'The system 1 has changed status code from 3 to 2'
    });
  });

  it('formats emails of subscription created', function () {
    expect(emailBuilder.subscribed()).toEqual({
      subject: '[' + title + '] Subscription created',
      body: 'Thanks for subscribing to ' + title + ' updates.'
    });
  });
});
