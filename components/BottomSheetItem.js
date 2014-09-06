/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var ListItem = require('../components/ListItem');

var BottomSheetItem = React.createClass({

  normalStyle: ReactStyle(function normalStyle(){
    return {
      height: 48
    };
  }),

  render: function() {
    return this.transferPropsTo(<ListItem styles={this.normalStyle()}>{this.props.children}</ListItem>);
  }

});

module.exports = BottomSheetItem;
