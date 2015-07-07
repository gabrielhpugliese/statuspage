/* @jsx React.DOM */
'use strict';

var IncidentAction = React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date)
  },

  formatDate: function (date) {
    return date && moment(date).format('MMM Do, HH:mm ZZ');
  },

  render: function () {

    return (
      <div className="incident-action">
        <span className="incident-action__name">
          Completed -
        </span>
          We are going to perform scheduled database maintenance on travis-ci.org. This is expected to take less than an hour. The site and API will be unavailable during this time. Incoming build requests will still be picked up, and processed later.
        <div className="incident-action__date">
          {this.formatDate(this.props.date)}
        </div>
      </div>
    );
  }
});

var IncidentDate = React.createClass({
  propTypes: {
    date: React.PropTypes.instanceOf(Date).isRequired,
    format: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      date: null,
      format: 'MMM Do, YYYY'
    };
  },

  formatDate: function (date) {
    return date && moment(date).format(this.props.format);
  },

  render: function () {
    return (
      <div className="incidents__date">
        {this.formatDate(this.props.date)}
      </div>
    );
  }
});

var IncidentTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  getDefaultProps: function () {
    return {
      title: ''
    };
  },

  render: function () {
    return (
      <div className="incidents__title">
        {this.props.title}
      </div>
    );
  }
});

var Incidents = ReactMeteor.createClass({
  templateName: 'Incidents',

  startMeteorSubscriptions: function () {
    return [
      Meteor.subscribe('incidents')
    ];
  },

  getMeteorState: function () {
    return {
      incidents: IncidentsColl.find({}, {sort: {updatedAt: -1}}).fetch(),
      isAdmin: Package['alanning:roles'].Roles.userIsInRole('admin')
    };
  },

  render: function () {
    var incidents = this.state.incidents;

    return ! _.isEmpty(incidents) && (
      <div className="incidents">
        <h4>Past Incidents</h4>
        {_.map(incidents, function (incident) {
          return (
            <div className="incidents__item">
              <IncidentDate date={incident.insertedAt} />
              <hr/>
              <IncidentTitle title={incident.description}/>

              <IncidentAction date={incident.updatedAt}/>
            </div>
          );
        })}
      </div>
    );
  }
});
