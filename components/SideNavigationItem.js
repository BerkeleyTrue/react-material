/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var RippleContainer = require('./RippleContainer');

var SideNavigationItem = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      cursor: 'pointer',
      fontSize: '13px',
      position: 'relative',
      padding: '10px 24px 10px 22px'
    }
  }),

  render: function() {
    return <div styles={this.normalStyle()} onClick={this.props.onClick}>
      {this.props.children}
    </div>;
  }

});

module.exports = SideNavigationItem;