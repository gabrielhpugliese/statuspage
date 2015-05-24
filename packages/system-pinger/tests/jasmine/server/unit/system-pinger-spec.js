describe('SystemPinger', function () {
  'use strict';
  var name = 'Google';
  var endpoint = 'http://google.com';

  beforeEach(function () {
    SystemsColl.remove({});
  });

  it('adds systems to SystemsColl', function () {
    spyOn(SystemsColl, 'insert');

    SystemPinger.addSystem(name, endpoint);

    expect(SystemsColl.insert).toHaveBeenCalledWith({
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
    var findOne = spyOn(SystemsColl, 'findOne').and.returnValue({
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
    expect(get).toHaveBeenCalled();
    expect(get.calls.argsFor(0)[0]).toBe(endpoint);
  });

});
