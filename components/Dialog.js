/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Dialog = React.createClass({

  normalStyle: ReactStyle(function() {
    return {

    };
  }),

  render: function() {
    return <div styles={this.normalStyle()}>

    </div>;
  }

});

module.exports = Dialog;