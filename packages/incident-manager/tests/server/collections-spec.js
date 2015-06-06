'use strict';

describe('Incident Manager Collections', function () {
  describe('IncidentColl', function () {
    it('checks params on dayHasZeroStatus', function () {
      try {
        IncidentsColl.dayHasZeroStatus({});
      } catch (err) {
        expect(err).toBeDefined();
      }

      expect(IncidentsColl.dayHasZeroStatus).toThrow();
    });

    it('searches for a status zero on a date', function () {
      var date = new Date('2015-01-01T00:00:00.000Z');
      var findOne = spyOn(IncidentsColl, 'findOne');
      var startDate, endDate;

      IncidentsColl.dayHasZeroStatus(date);

      startDate = moment(date).utc();
      endDate = moment(date).utc().add(1, 'day');

      expect(findOne).toHaveBeenCalledWith({
        status: 0,
        date: {
          '$gte': startDate.toDate(),
          '$lt': endDate.toDate()
        }
      });
    });
  });
});
