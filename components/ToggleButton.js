/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var RadioButton = require('./RadioButton');

var ToggleButton = React.createClass({

  normalStyle: ReactStyle(function() {
    return {
      cursor: 'pointer',
      display: 'inline-block',
      position: 'relative',
      height: '16px',
      width: '64px'
    };
  }),

  lineStyle: ReactStyle(function() {
    return {
      backgroundColor: '#5a5a5a',
      height: '1px',
      left: '16px',
      position: 'absolute',
      top: '8px',
      width: '32px'
    };
  }),

  circleStyle: ReactStyle(function() {
    return {

    }
  }),

  render: function() {
    var circleStyle = [this.circleStyle()];

    return <div styles={this.normalStyle()}>
      <div styles={this.lineStyle()} />
      <RadioButton />
    </div>;
  }

});

module.exports = ToggleButton;
