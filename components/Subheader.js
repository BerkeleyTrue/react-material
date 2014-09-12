/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Typography = require('../style/Typography');

var merge = require('../vendor/merge');

var Subheader = React.createClass({

  normalStyle: ReactStyle(function normalStyle(){
    return merge(Typography.subhead, {
      height: 48,
      lineHeight: '48px',
      padding: '0 16px',
      position: 'relative'
    });
  }),

  render: function() {
    return <div styles={this.normalStyle()}>
      {this.props.children}
    </div>
  }

});

module.exports = Subheader;
