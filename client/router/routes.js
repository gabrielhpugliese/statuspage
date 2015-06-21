'use strict';

FlowRouter.route('/', {
  action: function () {
    FlowLayout.render('Index');
  }
});

FlowRouter.route('/admin', {
  action: function () {
    FlowLayout.render('Admin');
  }
})
