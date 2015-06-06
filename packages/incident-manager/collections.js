'use strict';

IncidentsColl = new Mongo.Collection('incidents');

IncidentsColl.dayHasZeroStatus = function (date) {
  check(date, Date);

  date = moment(date).utc();

  var startDate = moment(date.format('YYYY-MM-DD') + 'T00:00:00.000Z').utc();
  var endDate = moment(startDate).utc().add(1, 'day');

  return !! this.findOne({
    status: 0,
    date: {
      '$gte': startDate.toDate(),
      '$lt': endDate.toDate()
    }
  });
};
