describe('SystemPinger', function () {
  'use strict';
  var name = 'Google';
  var endpoint = 'http://google.com';

  beforeEach(function () {
    SystemPinger.systems.remove({});
    SystemPinger.results.remove({});
  });

  it('adds systems to SystemPinger.systems', function () {
    spyOn(SystemPinger.systems, 'insert');

    SystemPinger.addSystem(name, endpoint);

    expect(SystemPinger.systems.insert).toHaveBeenCalledWith({
      name: name,
      endpoint: endpoint
    });
  });

  it('validates input on addSystem', function () {
    try {
      SystemPinger.addSystem({}, '');
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SystemPinger.addSystem).toThrow();

    try {
      SystemPinger.addSystem('', -1);
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SystemPinger.addSystem).toThrow();
  });

  it('pings a system and returns the status code', function () {
    var statusCode;
    var findOne = spyOn(SystemPinger.systems, 'findOne').and.returnValue({
      endpoint: endpoint
    });
    var get = spyOn(HTTP, 'get').and.callFake(function (endpoint, callback) {
      callback(null, {
        statusCode: 200
      });
    });

    statusCode = SystemPinger._getStatus(name);

    expect(findOne).toHaveBeenCalledWith({
      name: name
    });
    expect(get).toHaveBeenCalledWith(endpoint, jasmine.any(Function));
  });

  it('validates input before pinging a system', function () {
    try {
      SystemPinger._getStatus({});
    } catch (err) {
      expect(err).toBeDefined();
    }

    expect(SystemPinger._getStatus).toThrow();
  });

  it('saves status and update system with that status', function () {
    var resultsInsert = spyOn(SystemPinger.results, 'insert');
    var systemsUpdate = spyOn(SystemPinger.systems, 'update');
    var lastStatusCode = 200;

    SystemPinger._save(name, lastStatusCode);

    expect(resultsInsert).toHaveBeenCalledWith({
      name: name,
      statusCode: lastStatusCode,
      updatedAt: jasmine.any(Date)
    });

    expect(systemsUpdate).toHaveBeenCalledWith(
      {name: name},
      {$set: {lastStatusCode: lastStatusCode}}
    );

  });

  it('pings and save a system', function () {
    var statusCode = 200;
    var getStatus = spyOn(SystemPinger, '_getStatus').and.returnValue(statusCode);
    var save = spyOn(SystemPinger, '_save');

    SystemPinger.pingAndSave(name);

    expect(getStatus).toHaveBeenCalledWith(name);
    expect(save).toHaveBeenCalledWith(name, statusCode);
  });
});
