'use strict';

Accounts.onLogin(function addAdmin (login) {
  var user = login.user;
  var email = _.first(user.emails);
  var _id = user._id;
  var isAdmin = user.roles && _.contains(user.roles, 'admin');

  if (! isAdmin && _.contains(Meteor.settings.admins, email.address)) {
    Roles.addUsersToRoles(_id, 'admin');
  }
});

Meteor.publish(null, function () {
  return Meteor.roles.find({});
});
