/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var AppBar = React.createClass({

  normalAppBarStyle: ReactStyle(function() {
    return {
      backgroundColor: '#00bcd4',
      height: '48px',
      width: '100%'
    };
  }),

  render: function() {
    return <div styles={this.normalAppBarStyle()}>
      {this.props.children}
    </div>;
  }

});

module.exports = AppBar;