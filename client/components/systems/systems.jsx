/* @jsx React.DOM */
'use strict';

var Systems = ReactMeteor.createClass({
  templateName: 'Systems',

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

  getStatusVariables: function (statusCode) {
    var statuses = {
      2: {
        text: 'Operational',
        class: 'operational'
      },
      5: {
        text: 'Defective',
        class: 'defective'
      },
      4: {
        text: 'Not found',
        class: 'not-found'
      }
    };

    return statuses[Math.floor(statusCode / 100)];
  },

  render: function () {
    var self = this;

    return (
      <div className="systems">
        {_.map(this.state.systems, function (system) {
          var statusVars = self.getStatusVariables(system.lastStatusCode);
          var statusClass = 'systems__system-status--' + statusVars.class;

          return (
            <div className="systems__system">
              <div className="systems__system-name">
                {system.name}
              </div>
              <div className={statusClass}>
                {statusVars.text}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});
