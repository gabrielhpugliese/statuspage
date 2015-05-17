/* @jsx React.DOM */
'use strict';

var SubscribeStrip = React.createClass({
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
      <div className="head__subscribe-strip">
        <div className="head__title">{this.props.title}</div>
        <button className="head__subscribe-button">Subscribe to updates</button>
      </div>
    );
  }
});

var Head = ReactMeteor.createClass({
  templateName: 'Head',

  propTypes: {
    imageUrl: React.PropTypes.string
  },

  getDefaultProps: function () {
    return {
      imageUrl: ''
    };
  },

  render: function () {
    var style = {
      backgroundImage: 'url(' + this.props.imageUrl + ')'
    };

    return (
      <div className="head" style={style}>
        <SubscribeStrip title="CodersTV" />
      </div>
    );
  }
});
