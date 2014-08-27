/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var ReactStyle = require('react-style');

var Shadow = require('./Shadow');

var Card = React.createClass({

  normalCardStyle: ReactStyle(function(){
    return {
      margin: '8px',
      padding: '16px'
    };
  }),

  render: function() {
    return <Shadow>

    </Shadow>;
  }

});

module.exports = Card;