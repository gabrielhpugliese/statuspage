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

  getStatusDescription: function (statusCode) {
    var statuses = {
      200: 'Operational',
      500: 'Defective',
      404: 'Not found'
    };

    return statuses[statusCode];
  },

  render: function () {
    var self = this;

    return (
      <div className="systems">
        {_.map(this.state.systems, function (system) {
          return (
            <div className="systems__system">
              <div className="systems__system-name">
                {system.name}
              </div>
              <div className="systems__system-status">
                {self.getStatusDescription(system.lastStatusCode)}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
});
