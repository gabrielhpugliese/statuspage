System = function (doc) {
  'use strict';
  _.extend(this, doc);
};

System.prototype.getStatusCodeDigit = function () {
  'use strict';
  return Math.floor(this.lastStatusCode / 100);
};
