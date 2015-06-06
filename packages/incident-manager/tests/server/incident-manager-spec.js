'use strict';

describe('Incident Manager', function () {
  var incidentManager;
  var incident = {
    date: new Date(),
    description: 'No incidents reported today',
    status: 0
  };

  beforeEach(function () {
    incidentManager = new IncidentManager(IncidentsColl);
    incidentManager.incidents.remove({});
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
    var dayHasZeroStatus = spyOn(IncidentsColl, 'dayHasZeroStatus');
    var insert = spyOn(incidentManager.incidents, 'insert');

    incidentManager.create(
      incident.status,
      incident.date,
      incident.description
    );

    expect(dayHasZeroStatus).toHaveBeenCalledWith(incident.date);

    expect(insert).toHaveBeenCalledWith({
      insertedAt: incident.date,
      updatedAt: incident.date,
      resolvedAt: incident.date,
      description: incident.description,
      status: incident.status
    });
  });

  it('does not let create two incidents with status zero', function () {
    incidentManager.create(
      incident.status,
      incident.date,
      incident.description
    );

    try {
      incidentManager.create(
        incident.status,
        incident.date,
        incident.description
      );
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(incidentManager.create).toThrow();
  });
});
