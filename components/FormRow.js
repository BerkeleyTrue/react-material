/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var FormRow = React.createClass({

  normalStyle: ReactStyle(function normalStyle(){
    return {
      padding: '20px'
    };
  }),

  render: function() {
    return <div styles={this.normalStyle()}>
      {this.props.children}
    </div>;
  }

});

module.exports = FormRow;