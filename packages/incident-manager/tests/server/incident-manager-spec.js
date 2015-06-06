'use strict';

describe('Incident Manager', function () {
  var incidentManager;

  beforeEach(function () {
    incidentManager = new IncidentManager(IncidentsColl);
  });

  it('validates input before creating incident', function () {
    try {
      incidentManager.create({}, '');
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(incidentManager.create).toThrow();

    try {
      incidentManager.create(new Date(), {});
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(incidentManager.create).toThrow();
  });

  it('creates a new incident', function () {
    var insert = spyOn(incidentManager.incidents, 'insert');
    var date = new Date();
    var description = 'No incidents reported today';

    incidentManager.create(date, description);

    expect(insert).toHaveBeenCalledWith({
      insertedAt: date,
      updatedAt: date,
      resolvedAt: date,
      description: description
    });
  });
});
