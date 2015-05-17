/* @jsx React.DOM */
'use strict';

var Status = ReactMeteor.createClass({
  templateName: 'Status',

  render: function () {
    return (
      <div className="status">
        <div className="status__title">
          All Systems Operational
        </div>
        <div className="status__refresh-time">
          Refreshed 2 minutes ago
        </div>
      </div>
    );
  }
});
