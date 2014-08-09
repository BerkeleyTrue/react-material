/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Tab = React.createClass({

  normalStyle: ReactStyle(function(){
    return {
      display: 'inline-block'
    };
  }),

  render: function(){
    return <div>
      {this.props.children}
    </div>
  }

});

module.exports = Tab;