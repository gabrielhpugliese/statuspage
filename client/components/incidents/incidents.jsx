/* @jsx React.DOM */
'use strict';

var IncidentAction = React.createClass({
  render: function () {
    return (
      <div className="incident-action">
        <span className="incident-action__name">
          Completed -
        </span>
          We are going to perform scheduled database maintenance on travis-ci.org. This is expected to take less than an hour. The site and API will be unavailable during this time. Incoming build requests will still be picked up, and processed later.
        <div className="incident-action__date">
          May 23, 09:36 UTC
        </div>
      </div>
    );
  }
});

var Incidents = ReactMeteor.createClass({
  templateName: 'Incidents',

  render: function () {
    return (
      <div className="incidents">
        <h4>Past Incidents</h4>
        <div className="incidents__item">
          <div className="incidents__date">
            May 23, 2015
          </div>
          <hr/>

          <div className="incidents__title">
            Database maintenance
          </div>

          <IncidentAction />
        </div>
      </div>
    );
  }
});
