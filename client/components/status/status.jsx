/* @jsx React.DOM */
'use strict';

var Status = ReactMeteor.createClass({
  templateName: 'Status',

  startMeteorSubscriptions: function () {
    return [
      Meteor.subscribe('systems')
    ];
  },

  getMeteorState: function () {
    return {
      systems: SystemsColl.find().fetch()
    };
  },

  getSystemByMaxStatusCode: function () {
    var sortedSystems = _.sortBy(this.state.systems, function (system) {
      return -system.lastStatusCode;
    }) || [{}];

    return sortedSystems[0];
  },

  getStatusInformations: function (system) {
    var infos = {
      2: {
        title: 'All systems operational',
        class: 'operational'
      },
      4: {
        title: 'A system is unreachable',
        class: 'not-found'
      },
      5: {
        title: 'A system is defective',
        class: 'defective'
      }
    };
    var code;

    if (_.isEmpty(system)) {
      return {
        title: 'Unknown',
        class: 'unknown',
        refreshTime: 'Unknown'
      };
    }

    code = system.getStatusCodeDigit();
    return {
      title: infos[code].title,
      class: infos[code].class,
      updatedAt: system.updatedAt
    };
  },

  render: function () {
    var system = this.getSystemByMaxStatusCode();
    var infos = this.getStatusInformations(system);
    var className = 'status--' + infos.class;

    return (
      <div className={className}>
        <div className="status__title">
          {infos.title}
        </div>
        <div className="status__refresh-time">
          {infos.updatedAt}
        </div>
      </div>
    );
  }
});
