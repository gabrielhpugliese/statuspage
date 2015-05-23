/* @jsx React.DOM */
'use strict';

var SystemList = ReactMeteor.createClass({
  templateName: 'SystemList',

  render: function () {
    return (
      <div className="system-list">
        <div className="system-list__item">
          <div className="system-list__system-name">
          API
          </div>
          <div className="system-list__system-status">
            Operational
          </div>
        </div>
        <div className="system-list__item">
          <div className="system-list__system-name">
          API
          </div>
          <div className="system-list__system-status">
            Operational
          </div>
        </div>
        <div className="system-list__item">
          <div className="system-list__system-name">
          API
          </div>
          <div className="system-list__system-status">
            Operational
          </div>
        </div>
        <div className="system-list__item">
          <div className="system-list__system-name">
          API
          </div>
          <div className="system-list__system-status">
            Operational
          </div>
        </div>
      </div>
    );
  }
});
