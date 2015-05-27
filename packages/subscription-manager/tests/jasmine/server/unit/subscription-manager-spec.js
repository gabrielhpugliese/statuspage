describe('Subscription Manager', function () {
  'use strict';
  var email = 'aaa@bbb.com';

  it('validates input before saving email addresses', function () {
    try {
      SubscriptionManager.addEmail({});
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SubscriptionManager.addEmail).toThrow();
  });

  it('saves email addresses', function () {
    var insert = spyOn(SubscriptionManager.subscriptions, 'insert');

    SubscriptionManager.addEmail(email);

    expect(insert).toHaveBeenCalledWith({
      email: email
    });
  });

  it('validates input before sending email', function () {
    try {
      SubscriptionManager.sendEmail({}, '', '');
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SubscriptionManager.sendEmail).toThrow();

    try {
      SubscriptionManager.sendEmail('', -1, '');
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SubscriptionManager.sendEmail).toThrow();

    try {
      SubscriptionManager.sendEmail('', '', {});
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SubscriptionManager.sendEmail).toThrow();
  });

  it('sends emails', function () {
    var send = spyOn(Email, 'send');
    var subject = 'SUBJECT';
    var body = 'BODY';
    Meteor.settings = {
      public: {
        head: {
          title: 'TITLE'
        }
      },
      emailFrom: 'EMAILFROM'
    };

    SubscriptionManager.sendEmail(email, subject, body);

    expect(send).toHaveBeenCalledWith({
      to: email,
      from: Meteor.settings.emailFrom,
      subject: '[' + Meteor.settings.public.head.title + ' status] ' + subject,
      text: body
    });
  });
});
