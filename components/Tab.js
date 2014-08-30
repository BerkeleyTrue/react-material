/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Tab = React.createClass({

  normalTabStyle: ReactStyle(function normalTabStyle(){
    return {
      display: 'inline-block',
      textAlign: 'center'
    };
  }),

  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render: function(){
    return <div>
      {this.props.children}
    </div>
  }

});

module.exports = Tab;