/* @jsx React.DOM */
'use strict';

var SubscribeBox = React.createClass({
  propTypes: {
    visible: React.PropTypes.bool.isRequired,
    onSubmit: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      visible: false,
      onSubmit: null
    };
  },

  render: function () {
    var style = {
      display: this.props.visible ? 'block' : 'none'
    };

    return (
      <form className="head__subscribe-box" style={style} onSubmit={this.props.onSubmit}>
        Get notifications when there is an update or incident.
        <input className="head__subscribe-input" placeholder="email"></input>
        <button className="head__subscribe-button--full">Subscribe via email</button>
      </form>
    );
  }
});

var SubscribeStrip = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    onSubscribeClick: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      title: '',
      onSubscribeClick: null
    };
  },

  render: function () {
    return (
      <div className="head__subscribe-strip">
        <div className="head__title">{this.props.title}</div>
        <button onClick={this.props.onSubscribeClick} className="head__subscribe-button">Subscribe to updates</button>
      </div>
    );
  }
});

var Head = ReactMeteor.createClass({
  templateName: 'Head',

  propTypes: {
    imageUrl: React.PropTypes.string,
    title: React.PropTypes.string
  },

  getDefaultProps: function () {
    var settings = Meteor.settings;

    if (! settings || _.isEmpty(settings.public)) {
      return {
        imageUrl: '',
        title: 'StatusPage'
      };
    }

    return {
      imageUrl: settings.public.head.imageUrl || '',
      title: settings.public.head.title || ''
    };
  },

  getInitialState: function () {
    return {
      subscribeBoxVisible: false
    };
  },

  onSubscribeClick: function () {
    this.setState({
      subscribeBoxVisible: ! this.state.subscribeBoxVisible
    });
  },

  onSubscribeSubmit: function (event) {
    event.preventDefault();
    debugger;
  },

  render: function () {
    var style = {
      backgroundImage: 'url(' + this.props.imageUrl + ')'
    };

    return (
      <div className="head" style={style}>
        <SubscribeStrip title={this.props.title} onSubscribeClick={this.onSubscribeClick}/>
        <SubscribeBox visible={this.state.subscribeBoxVisible} onSubmit={this.onSubscribeSubmit} />
      </div>
    );
  }
});
