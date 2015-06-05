describe('Subscription Manager', function () {
  'use strict';
  var email = 'aaa@bbb.com';
  var subject = 'subject';
  var body = 'body';
  var emailBuilder;
  var send;

  beforeEach(function () {
    send = spyOn(Email, 'send');
    emailBuilder = new EmailBuilder('title');
  });

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
    spyOn(emailBuilder, 'subscribed').and.returnValue({
      subject: 'subject',
      body: 'body'
    });

    SubscriptionManager.addEmail(email);

    expect(insert).toHaveBeenCalledWith({
      email: email
    });
  });

  it('validates email before saving', function () {
    try {
      SubscriptionManager.addEmail('asaaa');
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SubscriptionManager.addEmail).toThrow();

    var insert = spyOn(SubscriptionManager.subscriptions, 'insert');
    var sendSubscribedEmail = spyOn(SubscriptionManager, '_sendSubscribedEmail');

    try {
      SubscriptionManager.addEmail(email);
    } catch (err) {
      expect(err).not.toBeDefined();
    }

    expect(insert).toHaveBeenCalled();
    expect(sendSubscribedEmail).toHaveBeenCalled();
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
      subject: subject,
      text: body
    });
  });

  it('finds and returns all emails subscribed as cursor', function () {
    var find = spyOn(SubscriptionManager.subscriptions, 'find');

    SubscriptionManager.getEmailsCursor();

    expect(find).toHaveBeenCalledWith({});
  });

  it('sends subscribed email', function () {
    var subscribed = spyOn(EmailBuilder.prototype, 'subscribed').and.returnValue({
      subject: subject,
      body: body
    });
    var sendEmail = spyOn(SubscriptionManager, 'sendEmail');

    SubscriptionManager._sendSubscribedEmail(email);

    expect(subscribed).toHaveBeenCalledWith(email);
    expect(sendEmail).toHaveBeenCalledWith(email, subject, body);
  });
});
